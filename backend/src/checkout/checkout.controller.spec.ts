import { Test, TestingModule } from '@nestjs/testing';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { LoggerModule } from '../common/logger/logger.module';
import { ProductsModule } from '../products/products.module';
import { PromotionsModule } from '../promotions/promotions.module';
import { CheckoutRequest } from './checkout.types';
import { PromotionsService } from '../promotions/promotions.service';

describe('CheckoutController', () => {
  let checkoutController: CheckoutController;
  let checkoutService: CheckoutService;
  let promotionsService: PromotionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule, ProductsModule, PromotionsModule],
      controllers: [CheckoutController],
      providers: [CheckoutService],
    }).compile();

    checkoutController = module.get<CheckoutController>(CheckoutController);
    checkoutService = module.get<CheckoutService>(CheckoutService);
    promotionsService = module.get<PromotionsService>(PromotionsService);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(checkoutController).toBeDefined();
  });

  describe('POST /', () => {
    it('should validate the values', async () => {
      checkoutService.validation = jest.fn().mockReturnValue({
        total: 399.98,
        discount: 0,
        payable: 399.98,
      });

      promotionsService.getByCode = jest.fn().mockReturnValue({});
      promotionsService.applyPromotion = jest.fn().mockReturnValue({});

      const response = await checkoutController.validation(<CheckoutRequest>{
        products: [{ id: 'wf', quantity: 2 }],
      });

      expect(response).toEqual({
        total: 399.98,
        discount: 0,
        payable: 399.98,
      });
    });
  });
});
