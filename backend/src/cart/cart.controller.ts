import { Body, Controller, Delete, Get, Headers, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CurrentUser, JwtUser } from '../common/current-user.decorator';
import { OptionalJwtGuard } from '../auth/optional-jwt.guard';
import { AddCartItemDto, PatchCartItemDto } from './dto/cart-item.dto';
import { CartService } from './cart.service';

@Controller('cart')
@UseGuards(OptionalJwtGuard)
export class CartController {
  constructor(private readonly cart: CartService) {}

  @Get()
  get(
    @CurrentUser() user: JwtUser | undefined,
    @Headers('x-session-id') sessionId: string | undefined,
  ) {
    return this.cart.getCart(user, sessionId);
  }

  @Post('items')
  add(
    @CurrentUser() user: JwtUser | undefined,
    @Headers('x-session-id') sessionId: string | undefined,
    @Body() dto: AddCartItemDto,
  ) {
    return this.cart.addItem(user, sessionId, dto);
  }

  @Patch('items/:bookId')
  patch(
    @CurrentUser() user: JwtUser | undefined,
    @Headers('x-session-id') sessionId: string | undefined,
    @Param('bookId', ParseIntPipe) bookId: number,
    @Body() dto: PatchCartItemDto,
  ) {
    return this.cart.patchItem(user, sessionId, bookId, dto.quantity);
  }

  @Delete('items/:bookId')
  remove(
    @CurrentUser() user: JwtUser | undefined,
    @Headers('x-session-id') sessionId: string | undefined,
    @Param('bookId', ParseIntPipe) bookId: number,
  ) {
    return this.cart.removeItem(user, sessionId, bookId);
  }
}
