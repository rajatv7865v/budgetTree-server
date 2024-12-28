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
import axios from 'axios';

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
  @HttpCode(HttpStatus.OK)
  @Get('callback')
  async callbackHandler(@Query('code') code: string, @Res() res: any) {
    try {
      console.log('call');
      const tokenResponse = await this.zohoService.getAccessToken(code);
      const accessToken = tokenResponse.access_token;
      console.log('accessToken', accessToken);
    } catch (error) {
      return;
      // res.status(500).json({ error: 'Failed to get access token or forms' });
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('get-zoho-people')
  async fetchZohoPeopleData(@Query('code') code: string, @Res() res: any) {
    return this.zohoService.fetchEmployees(code);
  }

  @HttpCode(HttpStatus.OK)
  @Get('get-zoho-crm')
  async fetchZohoCRMData(@Query('code') code: string, @Res() res: any) {
    return this.zohoService.fetchAllZohoCRMData('leads', 'access_token');
  }
}
