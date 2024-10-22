import { HttpService } from '@nestjs/axios';
import { Injectable, Res } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TypeFormService {
  constructor(private readonly httpService: HttpService) {}

  async connect(res: any) {
    const url =
      'https://api.typeform.com/oauth/authorize?client_id=H3BwQYmeavoYtQ7z8XBzFne7guwKh1EhdJbqmzwVvqD6&redirect_uri=https://app.budgetree.in/auth/typeform/callback&scope=forms:read+responses:read+webhooks:write';
    const headers = {
      //   Authorization: 'Bearer YOUR_ACCESS_TOKEN', // Add headers if required
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, { headers }),
      );

      // return response.data;
      res.redirect(response.data);
    } catch (error) {
      console.error('Error sending HTTP request:', error);
      throw error;
    }
  }
}
