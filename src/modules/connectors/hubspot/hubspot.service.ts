import { HttpService } from '@nestjs/axios';
import { Injectable, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HubSpotService {
  private readonly CLIENT_ID: string;
  private readonly CLIENT_SECRET: string;
  private readonly REDIRECT_URI: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.CLIENT_ID = this.configService.get<string>('HUBSPOT.ID');
    this.CLIENT_SECRET = this.configService.get<string>('HUBSPOT.SECRET');
    this.REDIRECT_URI = this.configService.get<string>('HUBSPOT.URI');
  }

  async connect(res: any) {
    try {
      const url = `https://app.hubspot.com/oauth/authorize?client_id=${this.CLIENT_ID}&scope=crm.objects.contacts.read&redirect_uri=${this.REDIRECT_URI}&response_type=code`;

      // Send the redirect URL to the frontend
      return res.json({ redirectUrl: url });
    } catch (error) {
      console.error('Error sending HTTP request:', error);
      throw error;
    }
  }

  async getAccessToken(code: string) {
    console.log('code in access token', code);
    const url = 'https://api.typeform.com/oauth/token';
    const body = {
      client_id: 'H3BwQYmeavoYtQ7z8XBzFne7guwKh1EhdJbqmzwVvqD6',
      client_secret: 'Ei8KwfA6sqWcTc1otuw9P8BA3CRhRKGbHhC4sNDFnojN',
      grant_type: 'authorization_code',
      code,
      redirect_uri: 'http://localhost:8080/api/v1/auth/typeform/callback',
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, body, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // Set the content type
          },
        }),
      );
      return response.data; // Includes access_token
    } catch (error) {
      console.log(error);
      console.error(
        'Error fetching access token:',
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  async getAllForms(accessToken: string) {
    const url = 'https://api.typeform.com/forms';
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, { headers }),
      );
      return response.data; // Returns all forms
    } catch (error) {
      console.error(
        'Error fetching forms:',
        error.response?.data || error.message,
      );
      throw error;
    }
  }
}
