import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { PromotionDto } from './promotions.dto';
import { PromotionsService } from './promotions.service';
import * as ResponseDecorator from '../common/response/response.decorator';

@Controller('promotions')
export class PromotionsController {
  constructor(private readonly promotionsService: PromotionsService) {}

  @Get('')
  @ApiOperation({
    operationId: 'promotions-list',
    summary: 'Promotions list',
    description: 'Promotions list',
    tags: ['Promotions'],
  })
  @ResponseDecorator.Successful(PromotionDto, true)
  @ResponseDecorator.BadRequest()
  @ResponseDecorator.Unauthorized()
  @ResponseDecorator.InternalServerError()
  @ResponseDecorator.BadGateway()
  async list(): Promise<PromotionDto[]> {
    return this.promotionsService.list();
  }

  @Get(':code')
  @ApiOperation({
    operationId: 'promotion-details',
    summary: 'Promotion details',
    description: 'Promotion details',
    tags: ['Promotions'],
  })
  @ResponseDecorator.Successful(PromotionDto)
  @ResponseDecorator.BadRequest()
  @ResponseDecorator.Unauthorized()
  @ResponseDecorator.InternalServerError()
  @ResponseDecorator.BadGateway()
  @ApiParam({
    name: 'code',
  })
  async get(@Param('code') code) {
    return this.promotionsService.getByCode(code);
  }
}
