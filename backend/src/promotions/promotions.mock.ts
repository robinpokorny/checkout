import {
  BundlePromotion,
  Promotion,
  PROMOTION_TYPES,
  TotalOrderPromotion,
} from './promotions.types';

export const mockPromotionsList: Promotion[] = [
  {
    code: 'RRD4D32',
    type: PROMOTION_TYPES.TOTAL_AMOUNT,
    description: '10% discount for orders above $1000 (pre-discount)',
    rule: <TotalOrderPromotion>{
      minAmount: 1000,
      discountPersentage: 10,
    },
  },
  {
    code: '44F4T11',
    type: PROMOTION_TYPES.TOTAL_AMOUNT,
    description: '15% discount for orders above $1500 (pre-discount)',
    rule: <TotalOrderPromotion>{
      minAmount: 1500,
      discountPersentage: 15,
    },
  },
  {
    code: 'FF9543D1',
    type: PROMOTION_TYPES.BUNDLE,
    description:
      'Reduces the docgen price to $8.99 a unit when at least 10 documents are purchased',
    rule: <BundlePromotion>{
      mainProductId: 'docgen',
      requireProductId: 'docgen',
      minQuantity: 10,
      newPrice: 8.99,
    },
  },
  {
    code: 'YYGWKJD',
    type: PROMOTION_TYPES.BUNDLE,
    description:
      'Reduces the form price to $89.99 a unit when at least 1 wf is purchased',
    rule: {
      mainProductId: 'form',
      requireProductId: 'wf',
      minQuantity: 1,
      newPrice: 89.99,
    },
  },
];
