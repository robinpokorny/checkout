import { ApiResponse } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import {
  BadRequestResponse,
  UnauthorizedResponse,
  InternalServerErrorResponse,
  BadGatewayResponse,
} from '../error/error.dto';

export const Successful = (
  type: any,
  isArray?: boolean,
  message?: string,
): MethodDecorator => {
  return ApiResponse({
    type,
    isArray: isArray || false,
    status: HttpStatus.OK,
    description: message || 'Request processed successfuly',
  });
};

export const Created = (type: any, message?: string): MethodDecorator => {
  return ApiResponse({
    type,
    status: HttpStatus.CREATED,
    description: message || 'Request processed successfuly',
  });
};

export const BadRequest = (message?: string): MethodDecorator => {
  return ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: BadRequestResponse,
    description: message || 'Bad request',
  });
};

export const Unauthorized = (message?: string): MethodDecorator => {
  return ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: UnauthorizedResponse,
    description: message || 'Unauthorized request',
  });
};

export const InternalServerError = (message?: string): MethodDecorator => {
  return ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: InternalServerErrorResponse,
    description: message || 'Internal server error',
  });
};

export const BadGateway = (message?: string): MethodDecorator => {
  return ApiResponse({
    status: HttpStatus.BAD_GATEWAY,
    type: BadGatewayResponse,
    description: message || 'Internal communication error',
  });
};
