import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { PromotionsService } from '../promotions/promotions.service';
import {
  CheckoutProduct,
  CheckoutRequest,
  CheckoutResponse,
} from './checkout.types';

@Injectable()
export class CheckoutService {
  constructor(
    private readonly productsService: ProductsService,
    private readonly promotionsService: PromotionsService,
  ) {}

  private formatProducts(products: CheckoutProduct[]) {
    const result = {};

    products.forEach(product => {
      if (product.quantity > 0) {
        result[product.id] = product;
      }
    });

    return result;
  }

  currencyFormat(num: number) {
    // return Math.round(num * 100) / 100;
    // return parseFloat(num.toFixed(2));
    return parseFloat(num.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]);
  }

  async validation(req: CheckoutRequest): Promise<CheckoutResponse> {
    const result: CheckoutResponse = {
      total: 0,
      discount: 0,
      payable: 0,
    };

    const products = this.formatProducts(req.products);
    const productsDetails = await this.productsService.getByIds(
      Object.keys(products),
    );

    productsDetails.forEach(product => {
      products[product.id]['price'] = product.price;
      result.total += product.price * products[product.id].quantity;
    });

    result.payable = result.total;

    const promotionResult = await this.promotionsService.applyPromotion({
      promotionCode: req.promotionCode,
      totalAmount: result.total,
      products,
    });

    if (promotionResult.error && promotionResult.error !== '') {
      result.error = promotionResult.error;
      return result;
    }

    if (!promotionResult.discount) {
      return result;
    }

    result.payable = this.currencyFormat(
      result.total - promotionResult.discount,
    );

    result.discount = result.total - result.payable;

    return result;
  }
}
