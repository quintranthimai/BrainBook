import { Module } from '@nestjs/common';
import { OptionalJwtGuard } from '../auth/optional-jwt.guard';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, OptionalJwtGuard],
})
export class OrdersModule {}
