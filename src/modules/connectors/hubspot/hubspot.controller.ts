import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { HubSpotService } from './hubspot.service';
import { ApiBasicAuth } from '@nestjs/swagger';
import { CustomHttpException } from 'src/core/exceptions';

@ApiBasicAuth()
@Controller('auth/hubspot')
export class HubSpotController {
  constructor(private readonly hubSpotService: HubSpotService) {}

  @Get('connect')
  connect(@Res() res: any) {
    try {
      return this.hubSpotService.connect(res);
    } catch (error) {
      throw new CustomHttpException(error);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('callback')
  async callbackHandler(@Query('code') code: string, @Res() res: Response) {
    console.log('clicked callback', code);
    try {
      const tokenResponse = await this.hubSpotService.getAccessToken(code);
      const accessToken = tokenResponse.access_token;
      console.log('accessToken', accessToken);

      // // Fetch all forms
      const forms = await this.hubSpotService.getAllForms(accessToken);

      // // Respond with the forms or redirect to a frontend page
      // // res.json(forms); // You could also render a view or redirect
      return forms;
    } catch (error) {
      return;
      // res.status(500).json({ error: 'Failed to get access token or forms' });
    }
  }
}
