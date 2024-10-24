import { HttpService } from '@nestjs/axios';
import { Injectable, Res } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ZohoService {
  constructor(private readonly httpService: HttpService) {}

  async connect(res: any) {
    try {
      const url = `https://accounts.zoho.com/oauth/v2/auth?scope=ZohoCRM.modules.ALL&client_id=1000.Z3C3M8NLPKYR8957AY6I943M653EOY&response_type=code&access_type=offline&redirect_uri=https://app.budgetree.in/auth/zoho/callback&prompt=consent`;

      // Send the redirect URL to the frontend
      return res.json({ redirectUrl: url });
    } catch (error) {
      console.error('Error sending HTTP request:', error);
      throw error;
    }
  }
}
