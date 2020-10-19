import { Test, TestingModule } from '@nestjs/testing';
import { PromotionsService } from './promotions.service';
import { mockPromotionsList } from './promotions.mock';
import { LoggerModule } from '../common/logger/logger.module';
import { ProductsDetail } from './promotions.types';

describe('PromotionsService', () => {
  let service: PromotionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule],
      providers: [PromotionsService],
    }).compile();

    service = module.get<PromotionsService>(PromotionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return list of all promotions', async () => {
    expect(await service.list()).toEqual(mockPromotionsList);
  });

  it('should return empty', async () => {
    expect(
      await service.applyPromotion({
        promotionCode: 'RRD4D32',
        totalAmount: 5 * 199.99,
        products: {
          wf: <ProductsDetail>{
            id: 'wf',
            price: 199.99,
            quantity: 5,
          },
        },
      }),
    ).toEqual({});
  });

  it('should return promotion calculation result', async () => {
    expect(
      await service.applyPromotion({
        promotionCode: 'YYGWKJD',
        totalAmount: 199.99 + 99.99,
        products: {
          wf: <ProductsDetail>{
            id: 'wf',
            price: 199.99,
            quantity: 1,
          },
          form: <ProductsDetail>{
            id: 'form',
            price: 99.99,
            quantity: 1,
          },
        },
      }),
    ).toEqual({
      discount: 10,
    });
  });
});
