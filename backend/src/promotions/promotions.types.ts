export enum PROMOTION_TYPES {
  TOTAL_AMOUNT = 'total_amount',
  BUNDLE = 'bundle',
}
export type TotalOrderPromotion = {
  minAmount: number;
  discountPersentage: number;
};

export type BundlePromotion = {
  mainProductId: string;
  requireProductId: string;
  minQuantity: number;
  newPrice: number;
};

export type Promotion = {
  code: string;
  type: PROMOTION_TYPES;
  description: string;
  rule: TotalOrderPromotion | BundlePromotion;
};

export type ProductsDetail = {
  id: string;
  price: number;
  quantity: number;
};

export type ApplyPromotionRequest = {
  promotionCode: string;
  totalAmount: number;
  products: Record<string, ProductsDetail>;
};

export type ApplyPromotionResponse = {
  total?: number;
  discount?: number;
  error?: string;
};
