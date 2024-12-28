import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
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
  private tokenStore = new Map<string, string>();
  constructor(private readonly typeFormService: TypeFormService) {}

  @HttpCode(HttpStatus.OK)
  @Get('connect')
  connect(@Res() res: any) {
    try {
      const url = this.typeFormService.connect(res);
      res.redirect(301, url);
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
      console.log(accessToken);

      res.redirect(
        301,
        'http://localhost:3000/integrations/dashboard/type_form',
      );
    } catch (error) {
      return;
      // res.status(500).json({ error: 'Failed to get access token or forms' });
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/get-all-forms')
  async getAllForms() {
    console.log(this.tokenStore.get('TYPEFORM'));
    const { items } = await this.typeFormService.getAllForms(
      '4kHsJhadCEgjv4jq6MMW3jasPu5U57iXWaR3Gow8LHT5',
    );
    console.log(items);
    return {
      items,
    };
  }

  @HttpCode(HttpStatus.CREATED)
  @Patch('/create-question/:formId')
  async createQuestion(
    @Param('formId') formId: string,
    @Body('question') question: string,
  ) {
    try {
      console.log(this.tokenStore.get('TYPEFORM'));
      const response = await this.typeFormService.createQuestion(
        '4kHsJhadCEgjv4jq6MMW3jasPu5U57iXWaR3Gow8LHT5',
        formId,
        question,
      );
      return response;
    } catch (error) {
      throw new CustomHttpException(error);
    }
  }
}
