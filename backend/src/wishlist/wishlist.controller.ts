import { Controller, Get, Post, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser, JwtUser } from '../common/current-user.decorator';
import { WishlistService } from './wishlist.service';

@Controller('wishlist')
@UseGuards(JwtAuthGuard)
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  findAll(@CurrentUser() user: JwtUser) {
    return this.wishlistService.findAll(user.sub);
  }

  @Post('add/:bookId')
  add(@Param('bookId', ParseIntPipe) bookId: number, @CurrentUser() user: JwtUser) {
    return this.wishlistService.add(user.sub, bookId);
  }

  @Post('remove/:bookId')
  remove(@Param('bookId', ParseIntPipe) bookId: number, @CurrentUser() user: JwtUser) {
    return this.wishlistService.remove(user.sub, bookId);
  }
}
