import { Controller, Get, Post, Body, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser, JwtUser } from '../common/current-user.decorator';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post(':bookId')
  @UseGuards(JwtAuthGuard)
  create(
    @Param('bookId', ParseIntPipe) bookId: number,
    @CurrentUser() user: JwtUser,
    @Body('rating') rating: number,
    @Body('comment') comment?: string,
  ) {
    return this.reviewsService.create(user.sub, bookId, rating, comment);
  }

  @Get('book/:bookId')
  findByBook(@Param('bookId', ParseIntPipe) bookId: number) {
    return this.reviewsService.findByBook(bookId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @CurrentUser() user: JwtUser) {
    return this.reviewsService.remove(user.sub, id);
  }
}
