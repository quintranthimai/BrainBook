import { Controller, Get, Query, ParseFloatPipe } from '@nestjs/common';
import { CouponsService } from './coupons.service';

@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Get('validate')
  validate(
    @Query('code') code: string,
    @Query('subtotal', ParseFloatPipe) subtotal: number,
  ) {
    return this.couponsService.validate(code, subtotal);
  }
}
