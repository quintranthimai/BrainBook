import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtUser } from '../common/current-user.decorator';
import { AddCartItemDto } from './dto/cart-item.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async getCart(user: JwtUser | undefined, sessionId: string | undefined) {
    const cart = await this.resolveCart(user, sessionId);
    return this.toResponse(cart.id);
  }

  async addItem(user: JwtUser | undefined, sessionId: string | undefined, dto: AddCartItemDto) {
    const cart = await this.resolveCart(user, sessionId);
    const book = await this.prisma.book.findFirst({
      where: { id: dto.bookId, isActive: true },
      include: { inventory: true, author: true },
    });
    if (!book) throw new NotFoundException('Book not found');
    const existing = await this.prisma.cartItem.findUnique({
      where: { cartId_bookId: { cartId: cart.id, bookId: dto.bookId } },
    });
    const nextQty = (existing?.quantity ?? 0) + dto.quantity;
    const available = Math.max(0, (book.inventory?.stock ?? 0) - (book.inventory?.reserved ?? 0));
    if (nextQty > available) throw new BadRequestException('Not enough stock');

    await this.prisma.cartItem.upsert({
      where: { cartId_bookId: { cartId: cart.id, bookId: dto.bookId } },
      create: {
        cartId: cart.id,
        bookId: dto.bookId,
        quantity: dto.quantity,
        titleSnapshot: book.title,
        authorSnapshot: book.author.name,
        imageUrlSnapshot: book.imageUrl,
        unitPriceSnapshot: book.price,
        lineTotalSnapshot: book.price.mul(dto.quantity),
      },
      update: {
        quantity: nextQty,
        titleSnapshot: book.title,
        authorSnapshot: book.author.name,
        imageUrlSnapshot: book.imageUrl,
        unitPriceSnapshot: book.price,
        lineTotalSnapshot: book.price.mul(nextQty),
      },
    });
    return this.toResponse(cart.id);
  }

  async patchItem(
    user: JwtUser | undefined,
    sessionId: string | undefined,
    bookId: number,
    quantity: number,
  ) {
    const cart = await this.resolveCart(user, sessionId);
    const item = await this.prisma.cartItem.findUnique({
      where: { cartId_bookId: { cartId: cart.id, bookId } },
    });
    if (!item) throw new NotFoundException('Cart line not found');
    const book = await this.prisma.book.findUnique({
      where: { id: bookId },
      include: { inventory: true, author: true },
    });
    if (!book) throw new NotFoundException('Book not found');
    const available = Math.max(0, (book.inventory?.stock ?? 0) - (book.inventory?.reserved ?? 0));
    if (available < quantity) throw new BadRequestException('Not enough stock');
    await this.prisma.cartItem.update({
      where: { cartId_bookId: { cartId: cart.id, bookId } },
      data: {
        quantity,
        titleSnapshot: book.title,
        authorSnapshot: book.author.name,
        imageUrlSnapshot: book.imageUrl,
        unitPriceSnapshot: book.price,
        lineTotalSnapshot: book.price.mul(quantity),
      },
    });
    return this.toResponse(cart.id);
  }

  async removeItem(user: JwtUser | undefined, sessionId: string | undefined, bookId: number) {
    const cart = await this.resolveCart(user, sessionId);
    await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id, bookId } });
    return this.toResponse(cart.id);
  }

  private async resolveCart(user: JwtUser | undefined, sessionId: string | undefined) {
    if (user?.sub) {
      let cart = await this.prisma.cart.findFirst({
        where: { userId: user.sub, status: 'ACTIVE' },
        orderBy: { updatedAt: 'desc' },
      });
      if (!cart) {
        cart = await this.prisma.cart.create({ data: { userId: user.sub, status: 'ACTIVE' } });
      }
      return cart;
    }
    const sid = sessionId?.trim();
    if (!sid) throw new BadRequestException('Send header X-Session-Id (guest) or Authorization Bearer (logged in)');
    let cart = await this.prisma.cart.findFirst({
      where: { sessionId: sid, userId: null, status: 'ACTIVE' },
      orderBy: { updatedAt: 'desc' },
    });
    if (!cart) {
      cart = await this.prisma.cart.create({ data: { sessionId: sid, status: 'ACTIVE' } });
    }
    return cart;
  }

  private async toResponse(cartId: string) {
    const cart = await this.prisma.cart.findUnique({
      where: { id: cartId },
      include: {
        items: {
          orderBy: { updatedAt: 'desc' },
        },
      },
    });
    if (!cart) throw new NotFoundException('Cart not found');
    const items = cart.items.map((i) => ({
      id: i.bookId,
      name: i.titleSnapshot,
      author: i.authorSnapshot,
      image: i.imageUrlSnapshot,
      price: i.unitPriceSnapshot.toNumber(),
      quantity: i.quantity,
      maxQuantity: 999,
    }));
    const subtotal = cart.items.reduce((s, i) => s + i.lineTotalSnapshot.toNumber(), 0);
    return { cartId: cart.id, items, subtotal };
  }
}
