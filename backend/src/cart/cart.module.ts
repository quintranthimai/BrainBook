import { Module } from '@nestjs/common';
import { OptionalJwtGuard } from '../auth/optional-jwt.guard';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  controllers: [CartController],
  providers: [CartService, OptionalJwtGuard],
})
export class CartModule {}
