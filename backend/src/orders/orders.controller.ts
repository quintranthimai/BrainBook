import { BadRequestException, Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CurrentUser, JwtUser } from '../common/current-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OptionalJwtGuard } from '../auth/optional-jwt.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { QueryOrdersDto } from './dto/query-orders.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { UpdatePaymentStatusDto } from './dto/update-payment-status.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orders: OrdersService) {}

  @Post()
  @UseGuards(OptionalJwtGuard)
  create(@Body() dto: CreateOrderDto, @CurrentUser() user: JwtUser | undefined) {
    return this.orders.create(dto, user);
  }

  @Get('lookup')
  lookup(@Query('orderNumber') orderNumber: string, @Query('email') email?: string) {
    if (!orderNumber?.trim()) throw new BadRequestException('orderNumber is required');
    return this.orders.findByOrderNumber(orderNumber.trim(), email);
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  myOrders(@CurrentUser() user: JwtUser) {
    return this.orders.findUserOrders(user.sub);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query() query: QueryOrdersDto) {
    return this.orders.findAll(query);
  }

  @Patch(':orderNumber/status')
  @UseGuards(JwtAuthGuard)
  updateStatus(@Param('orderNumber') orderNumber: string, @Body() dto: UpdateOrderStatusDto) {
    return this.orders.updateOrderStatus(orderNumber, dto.status);
  }

  @Patch(':orderNumber/payment-status')
  @UseGuards(JwtAuthGuard)
  updatePaymentStatus(
    @Param('orderNumber') orderNumber: string,
    @Body() dto: UpdatePaymentStatusDto,
  ) {
    return this.orders.updatePaymentStatus(orderNumber, dto.status);
  }
}
