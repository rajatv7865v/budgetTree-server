import { HttpService } from '@nestjs/axios';
import { Injectable, Res } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HubSpotService {
  constructor(private readonly httpService: HttpService) {}

  async connect(res: any) {
    try {
      const url = `https://app.hubspot.com/oauth/authorize?client_id=6e27480e-9fa0-446a-a3cb-ea78208f5a24&scope=crm.objects.contacts.read&redirect_uri=https://app.budgetree.in/auth/hubspot/callback&response_type=code`;

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
