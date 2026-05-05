import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CouponsService {
  constructor(private readonly prisma: PrismaService) {}

  async validate(code: string, subtotal: number) {
    const coupon = await this.prisma.coupon.findUnique({
      where: { code },
    });

    if (!coupon || !coupon.isActive) {
      throw new NotFoundException('Coupon not found or inactive');
    }

    if (coupon.expiresAt && coupon.expiresAt < new Date()) {
      throw new BadRequestException('Coupon has expired');
    }

    if (coupon.minSubtotal && subtotal < Number(coupon.minSubtotal)) {
      throw new BadRequestException(`Minimum order value of $${coupon.minSubtotal} required`);
    }

    // Check usage limit
    const usageCount = await this.prisma.couponUsage.count({
      where: { couponId: coupon.id },
    });

    if (coupon.maxUses && usageCount >= coupon.maxUses) {
      throw new BadRequestException('Coupon usage limit reached');
    }

    return coupon;
  }
}
