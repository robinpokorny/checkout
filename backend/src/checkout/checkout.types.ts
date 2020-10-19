export type CheckoutProduct = {
  id: string;
  quantity: number;
};

export type CheckoutRequest = {
  products: CheckoutProduct[];
  promotionCode: string;
};

export type CheckoutResponse = {
  total: number;
  discount: number;
  payable: number;
  error?: string;
};
