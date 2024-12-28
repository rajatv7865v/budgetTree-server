import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { SurveyMonkeyService } from './surveyMonkey.service';
import { ApiBasicAuth } from '@nestjs/swagger';
import { CustomHttpException } from 'src/core/exceptions';

@ApiBasicAuth()
@Controller('auth/surveymonkey')
export class SurveyMonkeyController {
  constructor(private readonly surveyMonkeyService: SurveyMonkeyService) {}

  @HttpCode(HttpStatus.OK)
  @Get('connect')
  connect(@Res() res: any): any {
    try {
      return this.surveyMonkeyService.connect(res);
    } catch (error) {
      throw new CustomHttpException(error);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('callback')
  async callbackHandler(@Query('code') code: string, @Res() res: any) {
    try {
      console.log('call', code);
      const tokenResponse = await this.surveyMonkeyService.getAccessToken(code);
      const accessToken = tokenResponse.access_token;
      console.log('accessToken', accessToken);
      return accessToken;
      // // // Fetch all forms
      // const surveys = await this.surveyMonkeyService.fetchSurveys(accessToken);
      // console.log('surveys', surveys);

      // // const surveyData =
      // const surveyData = await this.surveyMonkeyService.getSurveyDetails(
      //   surveys.data[0].id,
      //   accessToken,
      // );
      // console.log('surveys', surveyData);

      // console.log('forms', forms);
      // Respond with the forms or redirect to a frontend page
      // res.json(forms); // You could also render a view or redirect
      // return forms;
      // res.redirect(301, 'http://localhost:3000/dashboard/type_form');
    } catch (error) {
      return;
      // res.status(500).json({ error: 'Failed to get access token or forms' });
    }
  }
}
