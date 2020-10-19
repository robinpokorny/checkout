import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from './products.types';
import { mockProductsList } from './products.mock';
import { LoggerService } from '../common/logger/logger.service';

@Injectable()
export class ProductsService {
  private productsList;
  constructor(private readonly loggerService: LoggerService) {
    this.loggerService.setContext('ProductsService');
    this.productsList = mockProductsList;
  }

  async list(): Promise<Product[]> {
    return this.productsList;
  }

  async getById(id: string): Promise<Product> {
    let result;
    this.productsList.forEach(element => {
      if (element.id === id) {
        result = element;
      }
    });

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  async getByIds(ids: string[]): Promise<Product[]> {
    const results: Product[] = [];

    ids.forEach(id => {
      this.productsList.forEach(element => {
        if (element.id === id) {
          results.push(element);
        }
      });
    });

    if (ids.length > results.length) {
      this.loggerService.error('invalid product');
      throw new BadRequestException('invalid product');
    }

    return results;
  }
}
