import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WishlistService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    const wishlist = await this.prisma.wishlist.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            book: {
              include: {
                inventory: { select: { stock: true } }
              },
            },
          },
        },
      },
    }) as any;

    return (wishlist?.items || []).map((item: any) => ({
      ...item,
      book: {
        ...item.book,
        stock: item.book.inventory?.stock || 0
      }
    }));
  }

  async add(userId: string, bookId: number) {
    // Ensure wishlist exists
    await this.prisma.wishlist.upsert({
      where: { userId },
      update: {},
      create: { userId },
    });

    const existing = await this.prisma.wishlistItem.findUnique({
      where: { wishlistId_bookId: { wishlistId: userId, bookId } },
    });

    if (existing) return existing;

    return this.prisma.wishlistItem.create({
      data: { wishlistId: userId, bookId },
    });
  }

  async remove(userId: string, bookId: number) {
    try {
      return await this.prisma.wishlistItem.delete({
        where: { wishlistId_bookId: { wishlistId: userId, bookId } },
      });
    } catch (error) {
      throw new NotFoundException('Item not found in wishlist');
    }
  }
}
