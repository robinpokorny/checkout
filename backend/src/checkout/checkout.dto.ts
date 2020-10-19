import { ApiProperty } from '@nestjs/swagger';
import {
  CheckoutProduct,
  CheckoutRequest,
  CheckoutResponse,
} from './checkout.types';

export class CheckoutProductDto implements CheckoutProduct {
  @ApiProperty({
    type: 'string',
  })
  id: string;

  @ApiProperty({
    type: 'number',
  })
  quantity: number;
}

export class CheckoutRequestDto implements CheckoutRequest {
  @ApiProperty({
    type: CheckoutProductDto,
    isArray: true,
  })
  products: CheckoutProduct[];

  @ApiProperty({
    type: 'string',
  })
  promotionCode: string;
}

export class CheckoutResponseDto implements CheckoutResponse {
  @ApiProperty({
    type: 'number',
  })
  total: number;

  @ApiProperty({
    type: 'number',
  })
  discount: number;

  @ApiProperty({
    type: 'number',
  })
  payable: number;

  @ApiProperty({
    type: 'number',
    required: false,
  })
  error?: string;
}
