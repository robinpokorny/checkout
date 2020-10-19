import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CheckoutRequestDto, CheckoutResponseDto } from './checkout.dto';
import { CheckoutService } from './checkout.service';
import * as ResponseDecorator from '../common/response/response.decorator';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post('')
  @ApiOperation({
    operationId: 'checkout-validation',
    summary: 'Checkout',
    description: 'Checkout process',
    tags: ['Checkout'],
  })
  @ResponseDecorator.Successful(CheckoutResponseDto)
  @ResponseDecorator.BadRequest()
  @ResponseDecorator.Unauthorized()
  @ResponseDecorator.InternalServerError()
  @ResponseDecorator.BadGateway()
  @ApiBody({
    type: CheckoutRequestDto,
    description: 'Checkout request body',
  })
  async validation(
    @Body() body: CheckoutRequestDto,
  ): Promise<CheckoutResponseDto> {
    return this.checkoutService.validation(body);
  }
}
