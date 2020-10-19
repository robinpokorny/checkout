import { ApiProperty } from '@nestjs/swagger';
import {
  BundlePromotion,
  Promotion,
  PROMOTION_TYPES,
  TotalOrderPromotion,
} from './promotions.types';

export class TotalOrderPromotionDto implements TotalOrderPromotion {
  @ApiProperty({
    type: 'number',
    minimum: 1,
  })
  minAmount: number;

  @ApiProperty({
    type: 'number',
    minimum: 1,
    maximum: 100,
  })
  discountPersentage: number;
}

export class BundlePromotionDto implements BundlePromotion {
  @ApiProperty({
    type: 'string',
  })
  mainProductId: string;

  @ApiProperty({
    type: 'string',
  })
  requireProductId: string;

  @ApiProperty({
    type: 'number',
    minimum: 1,
  })
  minQuantity: number;

  @ApiProperty({
    type: 'number',
  })
  newPrice: number;
}

export class PromotionDto implements Promotion {
  @ApiProperty({
    type: 'string',
  })
  code: string;

  @ApiProperty({
    type: 'string',
    enum: PROMOTION_TYPES,
  })
  type: PROMOTION_TYPES;

  @ApiProperty({
    type: 'string',
  })
  description: string;

  @ApiProperty({
    type: TotalOrderPromotionDto || BundlePromotionDto,
  })
  rule: TotalOrderPromotion | BundlePromotion;
}
