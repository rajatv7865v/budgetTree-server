import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { TypeFormService } from './type-form.service';
import { ApiBasicAuth } from '@nestjs/swagger';
import { CustomHttpException } from 'src/core/exceptions';

@ApiBasicAuth()
@Controller('auth/typeform')
export class TypeFormController {
  constructor(private readonly typeFormService: TypeFormService) {}

  @Get('connect')
  // @HttpCode(HttpStatus.OK)
  connect(@Res() res: any) {
    try {
      const url = this.typeFormService.connect(res);
      res.redirect(301, 'http://localhost:8080');
    } catch (error) {
      throw new CustomHttpException(error);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('callback')
  async callbackHandler(@Query('code') code: string, @Res() res: any) {
    try {
      const tokenResponse = await this.typeFormService.getAccessToken(code);
      const accessToken = tokenResponse.access_token;
      console.log('accessToken', accessToken);

      // // Fetch all forms
      const forms = await this.typeFormService.getAllForms(accessToken);
      console.log('forms', forms);

      // Respond with the forms or redirect to a frontend page
      // res.json(forms); // You could also render a view or redirect

      // return forms;
      res.redirect(301, 'http://localhost:3000/dashboard/type_form');
    } catch (error) {
      return;
      // res.status(500).json({ error: 'Failed to get access token or forms' });
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/get-all-forms')
  async getAllForms() {
    const { items } = await this.typeFormService.getAllForms(
      'E1bzNRuVzr8tKNPg3Ppf23CGZiECwy2zPQwrz1cFazmv',
    );
    return {
      items,
    };
  }
}
