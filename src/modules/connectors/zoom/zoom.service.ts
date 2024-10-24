import { HttpService } from '@nestjs/axios';
import { Injectable, Res } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ZoomService {
  constructor(private readonly httpService: HttpService) {}

  async connect(res: any) {
    try {
      const url = `https://zoom.us/oauth/authorize?response_type=code&client_id=CxsSW4DDSjSDoCEsEA2oog&redirect_uri=https://app.budgetree.in/auth/zoom/callback&scope=meeting:read`;

      // Send the redirect URL to the frontend
      return res.json({ redirectUrl: url });
    } catch (error) {
      console.error('Error sending HTTP request:', error);
      throw error;
    }
  }
}
