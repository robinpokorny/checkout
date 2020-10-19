import { ApiProperty } from '@nestjs/swagger';
import { Product } from './products.types';

export class ProductDto implements Product {
  @ApiProperty({
    type: 'string',
  })
  id: string;

  @ApiProperty({
    type: 'string',
  })
  name: string;

  @ApiProperty({
    type: 'number',
  })
  price: number;
}
