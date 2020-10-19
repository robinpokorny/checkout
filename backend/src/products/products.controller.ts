import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { ProductDto } from './products.dto';
import * as ResponseDecorator from '../common/response/response.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('')
  @ApiOperation({
    operationId: 'products-list',
    summary: 'Products list',
    description: 'Products list',
    tags: ['Products'],
  })
  @ResponseDecorator.Successful(ProductDto, true)
  @ResponseDecorator.BadRequest()
  @ResponseDecorator.Unauthorized()
  @ResponseDecorator.InternalServerError()
  @ResponseDecorator.BadGateway()
  async list(): Promise<ProductDto[]> {
    return this.productsService.list();
  }

  @Get(':id')
  @ApiOperation({
    operationId: 'products-details',
    summary: 'Products details',
    description: 'Products details',
    tags: ['Products'],
  })
  @ResponseDecorator.Successful(ProductDto)
  @ResponseDecorator.BadRequest()
  @ResponseDecorator.Unauthorized()
  @ResponseDecorator.InternalServerError()
  @ResponseDecorator.BadGateway()
  @ApiParam({
    name: 'id',
  })
  async get(@Param('id') id) {
    return this.productsService.getById(id);
  }
}
