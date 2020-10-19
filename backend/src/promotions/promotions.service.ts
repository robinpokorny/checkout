import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ApplyPromotionRequest,
  ApplyPromotionResponse,
  BundlePromotion,
  Promotion,
  PROMOTION_TYPES,
  TotalOrderPromotion,
} from './promotions.types';
import { mockPromotionsList } from './promotions.mock';
import { resolver } from '../common/helpers/helpers';
import { LoggerService } from '../common/logger/logger.service';

@Injectable()
export class PromotionsService {
  private promotionsList;

  constructor(private readonly loggerService: LoggerService) {
    this.loggerService.setContext('PromotionsService');
    this.promotionsList = mockPromotionsList;
  }

  async list(): Promise<Promotion[]> {
    return this.promotionsList;
  }

  async getByCode(code: string): Promise<Promotion> {
    let result;
    this.promotionsList.forEach(element => {
      if (element.code === code) {
        result = element;
      }
    });

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  async applyPromotion(
    req: ApplyPromotionRequest,
  ): Promise<ApplyPromotionResponse> {
    if (req.promotionCode && req.promotionCode !== '') {
      const [promotion, error] = await resolver(
        this.getByCode(req.promotionCode),
      );

      if (error) {
        this.loggerService.error('error on getting promotion details', error);
        return <ApplyPromotionResponse>{
          error: 'invalid promotion code',
        };
      }

      if (promotion.type === PROMOTION_TYPES.TOTAL_AMOUNT) {
        const rule = <TotalOrderPromotion>promotion.rule;
        if (req.totalAmount >= rule.minAmount) {
          return {
            discount: (req.totalAmount / 100) * rule.discountPersentage,
          };
        }
      } else if (promotion.type === PROMOTION_TYPES.BUNDLE) {
        const rule = <BundlePromotion>promotion.rule;
        if (
          req.products[rule.mainProductId] &&
          req.products[rule.requireProductId] &&
          req.products[rule.requireProductId].quantity <= rule.minQuantity
        ) {
          return {
            discount:
              req.products[rule.mainProductId].price -
              rule.newPrice * req.products[rule.mainProductId].quantity,
          };
        }
      }
    }

    return <ApplyPromotionResponse>{};
  }
}
