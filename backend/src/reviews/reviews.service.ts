import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, bookId: number, rating: number, comment: string | undefined) {
    if (rating < 1 || rating > 5) throw new BadRequestException('Rating must be between 1 and 5');

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    const userName = user ? `${user.firstName} ${user.lastName}`.trim() || user.email : 'Anonymous';

    const review = await this.prisma.review.create({
      data: {
        rating,
        comment: comment || '',
        userId,
        bookId,
        userName,
      },
    });

    // Update book ratingAvg and reviewCount
    const stats = await this.prisma.review.aggregate({
      where: { bookId },
      _avg: { rating: true },
      _count: { id: true },
    });

    await this.prisma.book.update({
      where: { id: bookId },
      data: {
        ratingAvg: stats._avg.rating || 0,
        reviewCount: stats._count.id,
      },
    });

    return review;
  }

  async findByBook(bookId: number) {
    return this.prisma.review.findMany({
      where: { bookId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        rating: true,
        comment: true,
        userName: true,
        createdAt: true,
        user: {
          select: { firstName: true, lastName: true }
        }
      }
    });
  }

  async remove(userId: string, id: string) {
    const review = await this.prisma.review.findUnique({ where: { id } });
    if (!review) throw new NotFoundException('Review not found');
    if (review.userId !== userId) throw new BadRequestException('Not allowed');

    await this.prisma.review.delete({ where: { id } });
    
    // Recalculate stats
    const stats = await this.prisma.review.aggregate({
      where: { bookId: review.bookId },
      _avg: { rating: true },
      _count: { id: true },
    });

    await this.prisma.book.update({
      where: { id: review.bookId },
      data: {
        ratingAvg: stats._avg.rating || 0,
        reviewCount: stats._count.id,
      },
    });

    return { success: true };
  }
}
