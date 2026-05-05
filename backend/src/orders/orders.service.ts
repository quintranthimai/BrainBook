import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { OrderStatus, PaymentMethod, PaymentStatus, Prisma } from '@prisma/client';
import { customAlphabet } from 'nanoid';
import { PrismaService } from '../prisma/prisma.service';
import { JwtUser } from '../common/current-user.decorator';
import { CreateOrderDto } from './dto/create-order.dto';
import { QueryOrdersDto } from './dto/query-orders.dto';

const orderSuffix = customAlphabet('0123456789ABCDEFGHJKLMNPQRSTUVWXYZ', 8);

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  private buildOrderNumber(): string {
    const d = new Date();
    const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
    return `ORD-${ymd}-${orderSuffix()}`;
  }

  async create(dto: CreateOrderDto, user?: JwtUser) {
    if (!dto.items.length) throw new BadRequestException('Cart is empty');

    const idem = dto.idempotencyKey?.trim();
    if (idem) {
      const existing = await this.prisma.order.findUnique({ where: { idempotencyKey: idem } });
      if (existing) {
        return {
          id: existing.id,
          orderNumber: existing.orderNumber,
          total: existing.total.toNumber(),
          status: existing.status,
        };
      }
    }

    let shippingAddressId: string | undefined = dto.shippingAddressId;
    if (shippingAddressId) {
      if (!user) throw new UnauthorizedException('shippingAddressId requires a logged-in customer');
      const addr = await this.prisma.address.findFirst({
        where: { id: shippingAddressId, userId: user.sub },
      });
      if (!addr) throw new NotFoundException('Saved address not found');
    }

    const bookIds = [...new Set(dto.items.map((i) => i.bookId))];
    const books = await this.prisma.book.findMany({
      where: { id: { in: bookIds }, isActive: true },
      include: { author: true, inventory: true },
    });
    const byId = new Map(books.map((b) => [b.id, b]));

    let subtotal = new Prisma.Decimal(0);
    const lines: {
      bookId: number;
      title: string;
      author: string;
      imageUrl: string;
      unitPrice: Prisma.Decimal;
      quantity: number;
      lineTotal: Prisma.Decimal;
    }[] = [];

    for (const line of dto.items) {
      const book = byId.get(line.bookId);
      if (!book) throw new BadRequestException(`Invalid bookId: ${line.bookId}`);
      const available = Math.max(0, (book.inventory?.stock ?? 0) - (book.inventory?.reserved ?? 0));
      if (available < line.quantity) throw new BadRequestException(`Insufficient stock for: ${book.title}`);
      const unit = book.price;
      const lineTotal = unit.mul(line.quantity);
      subtotal = subtotal.add(lineTotal);
      lines.push({
        bookId: book.id,
        title: book.title,
        author: book.author.name,
        imageUrl: book.imageUrl,
        unitPrice: unit,
        quantity: line.quantity,
        lineTotal,
      });
    }

    const requestedCouponCode = dto.couponCode?.trim() ? dto.couponCode.trim().toUpperCase() : null;

    const ship = new Prisma.Decimal(dto.shippingAmount);
    const totalWithoutDiscount = subtotal.add(ship);
    if (totalWithoutDiscount.lt(0)) throw new BadRequestException('Invalid totals');

    const orderNumber = await this.allocateOrderNumber();

    const result = await this.prisma.$transaction(async (tx) => {
      let couponDiscount: Prisma.Decimal | null = null;
      let couponCode: string | null = null;
      let couponId: number | null = null;

      if (requestedCouponCode) {
        const coupon = await tx.coupon.findFirst({
          where: {
            code: requestedCouponCode,
            isActive: true,
            deletedAt: null,
            OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
          },
        });
        if (coupon) {
          if (coupon.minSubtotal && subtotal.lt(coupon.minSubtotal)) {
            throw new BadRequestException('Coupon is not applicable');
          }

          await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${coupon.code}))`;
          const used = await tx.couponUsage.count({ where: { couponId: coupon.id } });
          if (coupon.maxUses != null && used >= coupon.maxUses) {
            throw new BadRequestException('Coupon is no longer available');
          }

          if (coupon.type === 'PERCENT') {
            couponDiscount = subtotal.mul(coupon.value).div(100);
          } else {
            couponDiscount = coupon.value;
          }
          if (couponDiscount.gt(subtotal)) couponDiscount = subtotal;

          couponCode = coupon.code;
          couponId = coupon.id;
        }
      }

      const discount = couponDiscount ?? new Prisma.Decimal(0);
      const total = totalWithoutDiscount.sub(discount);
      if (total.lt(0)) throw new BadRequestException('Invalid totals');

      for (const line of dto.items) {
        const affected = await tx.$executeRaw`
          UPDATE "Inventory"
          SET "reserved" = "reserved" + ${line.quantity}
          WHERE "bookId" = ${line.bookId}
            AND ("stock" - "reserved") >= ${line.quantity}
        `;
        if (affected !== 1) throw new BadRequestException('Stock changed, retry checkout');
      }

      const order = await tx.order.create({
        data: {
          orderNumber,
          paymentMethod: dto.paymentMethod,
          subtotal,
          shippingAmount: ship,
          shippingLabel: dto.shippingLabel ?? null,
          total,
          customerFirstName: dto.customerFirstName,
          customerLastName: dto.customerLastName,
          customerEmail: dto.customerEmail.toLowerCase(),
          customerPhone: dto.customerPhone,
          countryCode: dto.countryCode,
          city: dto.city,
          addressLine1: dto.addressLine1,
          addressLine2: dto.addressLine2 ?? null,
          orderNotes: dto.orderNotes ?? null,
          shippingAddressId: shippingAddressId ?? null,
          couponCode,
          couponDiscount: couponDiscount,
          idempotencyKey: idem ?? null,
          userId: user?.sub ?? null,
          items: {
            create: lines.map((l) => ({
              bookId: l.bookId,
              titleSnapshot: l.title,
              authorSnapshot: l.author,
              imageUrlSnapshot: l.imageUrl,
              unitPrice: l.unitPrice,
              quantity: l.quantity,
              lineTotal: l.lineTotal,
            })),
          },
        },
      });

      await tx.payment.create({
        data: {
          orderId: order.id,
          method: dto.paymentMethod,
          status: PaymentStatus.PENDING,
          amount: total,
          currency: 'USD',
        },
      });

      if (couponId && couponCode) {
        await tx.couponUsage.create({
          data: {
            couponId,
            userId: user?.sub ?? null,
            orderId: order.id,
          },
        });
      }

      for (const line of dto.items) {
        const updated = await tx.inventory.updateMany({
          where: { bookId: line.bookId, reserved: { gte: line.quantity }, stock: { gte: line.quantity } },
          data: { reserved: { decrement: line.quantity }, stock: { decrement: line.quantity } },
        });
        if (updated.count !== 1) throw new BadRequestException('Stock finalize failed, retry checkout');
      }

      return order;
    });

    return {
      id: result.id,
      orderNumber: result.orderNumber,
      total: result.total.toNumber(),
      status: result.status,
    };
  }

  async findByOrderNumber(orderNumber: string, email?: string) {
    const order = await this.prisma.order.findUnique({
      where: { orderNumber },
      include: {
        items: true,
        payments: { orderBy: { createdAt: 'desc' }, take: 5 },
      },
    });
    if (!order) throw new NotFoundException('Order not found');
    if (email && order.customerEmail.toLowerCase() !== email.toLowerCase()) {
      throw new NotFoundException('Order not found');
    }
    return {
      orderNumber: order.orderNumber,
      status: order.status,
      paymentMethod: order.paymentMethod,
      subtotal: order.subtotal.toNumber(),
      shippingAmount: order.shippingAmount.toNumber(),
      shippingLabel: order.shippingLabel,
      total: order.total.toNumber(),
      customerFirstName: order.customerFirstName,
      customerLastName: order.customerLastName,
      customerEmail: order.customerEmail,
      customerPhone: order.customerPhone,
      countryCode: order.countryCode,
      city: order.city,
      addressLine1: order.addressLine1,
      addressLine2: order.addressLine2,
      items: order.items.map((i) => ({
        title: i.titleSnapshot,
        author: i.authorSnapshot,
        imageUrl: i.imageUrlSnapshot,
        unitPrice: i.unitPrice.toNumber(),
        quantity: i.quantity,
        lineTotal: i.lineTotal.toNumber(),
      })),
      payments: order.payments.map((p) => ({
        status: p.status,
        amount: p.amount.toNumber(),
        transactionId: p.transactionId,
        createdAt: p.createdAt,
      })),
    };
  }

  async findAll(query: QueryOrdersDto = {}) {
    const where: Prisma.OrderWhereInput = {
      deletedAt: null,
    };

    if (query.q?.trim()) {
      const q = query.q.trim();
      where.OR = [
        { orderNumber: { contains: q, mode: 'insensitive' } },
        { customerEmail: { contains: q, mode: 'insensitive' } },
        { customerPhone: { contains: q, mode: 'insensitive' } },
      ];
    }

    if (query.status) {
      where.status = query.status as OrderStatus;
    }

    if (query.paymentMethod) {
      where.paymentMethod = query.paymentMethod as PaymentMethod;
    }

    if (query.paymentStatus) {
      where.payments = { some: { status: query.paymentStatus as PaymentStatus } };
    }

    const page = query.page ?? 1;
    const limit = Math.min(query.limit ?? 50, 200);
    const skip = (page - 1) * limit;

    const orders = await this.prisma.order.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      include: {
        payments: { orderBy: { createdAt: 'desc' }, take: 1 },
      },
    });
    return orders.map((order) => ({
      id: order.id,
      orderNumber: order.orderNumber,
      total: order.total.toNumber(),
      status: order.status,
      paymentStatus: order.payments?.[0]?.status || 'UNKNOWN',
      paymentMethod: order.paymentMethod,
      createdAt: order.createdAt,
    }));
  }

  async findUserOrders(userId: string) {
    const orders = await this.prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        payments: { orderBy: { createdAt: 'desc' }, take: 1 },
      },
    });

    return orders.map((order) => ({
      id: order.id,
      orderNumber: order.orderNumber,
      total: order.total.toNumber(),
      status: order.status,
      paymentStatus: order.payments?.[0]?.status || 'UNKNOWN',
      paymentMethod: order.paymentMethod,
      createdAt: order.createdAt,
    }));
  }

  async updateOrderStatus(orderNumber: string, status: OrderStatus) {
    const order = await this.prisma.order.update({
      where: { orderNumber },
      data: { status },
      select: { id: true, orderNumber: true, status: true, updatedAt: true },
    });
    return order;
  }

  async updatePaymentStatus(orderNumber: string, status: PaymentStatus) {
    const order = await this.prisma.order.findUnique({
      where: { orderNumber },
      select: { id: true },
    });
    if (!order) throw new NotFoundException('Order not found');

    const payment = await this.prisma.payment.findFirst({
      where: { orderId: order.id },
      orderBy: { createdAt: 'desc' },
    });
    if (!payment) throw new NotFoundException('Payment not found');

    const now = new Date();
    const data: Prisma.PaymentUpdateInput = { status };

    if (status === PaymentStatus.CAPTURED) {
      data.paidAt = now;
    }
    if (status === PaymentStatus.REFUNDED || status === PaymentStatus.PARTIALLY_REFUNDED) {
      data.refundedAt = now;
    }

    const updated = await this.prisma.payment.update({
      where: { id: payment.id },
      data,
      select: { id: true, status: true, paidAt: true, refundedAt: true, updatedAt: true },
    });

    return updated;
  }

  /** Retry on rare orderNumber collision. */
  private async allocateOrderNumber(max = 8): Promise<string> {
    for (let i = 0; i < max; i++) {
      const candidate = this.buildOrderNumber();
      const exists = await this.prisma.order.findUnique({ where: { orderNumber: candidate } });
      if (!exists) return candidate;
    }
    throw new BadRequestException('Could not allocate order number');
  }
}
