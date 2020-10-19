import { Module } from '@nestjs/common';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { LoggerModule } from '../common/logger/logger.module';
import { PromotionsModule } from '../promotions/promotions.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [LoggerModule, ProductsModule, PromotionsModule],
  controllers: [CheckoutController],
  providers: [CheckoutService],
  exports: [CheckoutService],
})
export class CheckoutModule {}
