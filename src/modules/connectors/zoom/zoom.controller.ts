import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ZoomService } from './zoom.service';
import { ApiBasicAuth } from '@nestjs/swagger';
import { CustomHttpException } from 'src/core/exceptions';

@ApiBasicAuth()
@Controller('auth/zoom')
export class ZoomController {
  constructor(private readonly zoomService: ZoomService) {}

  @Get('connect')
  connect(@Res() res: any) {
    try {
      return this.zoomService.connect(res);
    } catch (error) {
      throw new CustomHttpException(error);
    }
  }
}
