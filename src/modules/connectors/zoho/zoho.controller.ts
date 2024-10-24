import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ZohoService } from './zoho.service';
import { ApiBasicAuth } from '@nestjs/swagger';
import { CustomHttpException } from 'src/core/exceptions';

@ApiBasicAuth()
@Controller('auth/zoho')
export class ZohoController {
  constructor(private readonly zohoService: ZohoService) {}

  @Get('connect')
  connect(@Res() res: any) {
    try {
      return this.zohoService.connect(res);
    } catch (error) {
      throw new CustomHttpException(error);
    }
  }
}
