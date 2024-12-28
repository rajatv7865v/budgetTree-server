import { HttpService } from '@nestjs/axios';
import { Injectable, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class SurveyMonkeyService {
  private readonly CLIENT_ID: string;
  private readonly CLIENT_SECRET: string;
  private readonly REDIRECT_URI: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.CLIENT_ID = this.configService.get<string>('SURVEY_MONKEY.ID');
    this.CLIENT_SECRET = this.configService.get<string>('SURVEY_MONKEY.SECRET');
    this.REDIRECT_URI = this.configService.get<string>('SURVEY_MONKEY.URI');
  }

  async connect(res: any) {
    try {
      const url: string = `https://api.surveymonkey.com/oauth/authorize?client_id=${this.CLIENT_ID}&response_type=code&redirect_uri=${this.REDIRECT_URI}&scope=surveys_read%20surveys_write`;

      return res.json({ redirectUrl: url });
    } catch (error) {
      console.error('Error sending HTTP request:', error);
      throw error;
    }
  }

  async getAccessToken(code: string) {
    const authorizationCode = code;

    if (!authorizationCode) {
      return { error: 'Authorization code not provided' };
    }

    const tokenUrl = 'https://api.surveymonkey.com/oauth/token';

    try {
      const response = await axios.post(
        tokenUrl,
        {
          client_id: this.CLIENT_ID,
          client_secret: this.CLIENT_SECRET,
          code: code,
          redirect_uri: this.REDIRECT_URI,
          grant_type: 'authorization_code',
        },
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      );

      if (response.status === 200) {
        // Handle access token (e.g., save it to a database)
        return { access_token: response.data.access_token };
      } else {
        return { error: response.data };
      }
    } catch (error) {
      console.error('Error exchanging authorization code:', error.message);
      return { error: 'Internal Server Error' };
    }
  }
}
