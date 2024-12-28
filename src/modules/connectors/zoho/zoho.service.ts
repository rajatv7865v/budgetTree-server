import { HttpService } from '@nestjs/axios';
import { Injectable, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ZohoService {
  private CLIENT_ID: string;
  private REDIRECT_URI: string;
  private CLIENT_SECRET: string;
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.CLIENT_ID = this.configService.get<string>('ZOHO.ID');
    this.REDIRECT_URI = this.configService.get<string>('ZOHO.URI');
    this.CLIENT_SECRET = this.configService.get<string>('ZOHO.SECRET');
  }

  async connect(res: any) {
    try {
      const url = `https://accounts.zoho.com/oauth/v2/auth?scope=ZohoCRM.modules.ALL&client_id=${this.CLIENT_ID}&response_type=code&access_type=offline&redirect_uri=${this.REDIRECT_URI}&prompt=consent`;

      // Send the redirect URL to the frontend
      return res.json({ redirectUrl: url });
    } catch (error) {
      console.error('Error sending HTTP request:', error);
      throw error;
    }
  }

  async getAccessToken(authCode: any) {
    const tokenUrl = 'https://accounts.zoho.com/oauth/v2/token';

    try {
      const response = await axios.post(tokenUrl, null, {
        params: {
          grant_type: 'authorization_code',
          client_id: this.CLIENT_ID,
          client_secret: this.CLIENT_SECRET,
          redirect_uri: this.REDIRECT_URI,
          code: authCode,
        },
      });

      console.log('Access Token Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching access token:', error.response.data);
    }
  }

  async fetchEmployees(accessToken: string) {
    const apiUrl =
      'https://www.zohoapis.com/people/api/forms/P_EmployeeView/records';

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log('Employee Data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching employee data:', error.response.data);
    }
  }

  async fetchAllZohoCRMData(moduleName: string, accessToken: string) {
    let allData = [];
    let page = 1;
    let moreRecords = true;

    while (moreRecords) {
      const apiUrl = `https://www.zohoapis.com/crm/v2/${moduleName}?page=${page}`;

      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        allData = [...allData, ...response.data.data];
        moreRecords = response.data.info.more_records;
        page += 1;
      } catch (error) {
        console.error('Error fetching paginated data:', error.response.data);
        break;
      }
    }
  }

  async refreshAccessToken(refreshToken: string) {
    const tokenUrl = 'https://accounts.zoho.com/oauth/v2/token';
    const clientId = 'YOUR_CLIENT_ID';
    const clientSecret = 'YOUR_CLIENT_SECRET';

    try {
      const response = await axios.post(tokenUrl, null, {
        params: {
          grant_type: 'refresh_token',
          client_id: clientId,
          client_secret: clientSecret,
          refresh_token: refreshToken,
        },
      });

      console.log('Refreshed Access Token:', response.data.access_token);
      return response.data.access_token;
    } catch (error) {
      console.error('Error refreshing access token:', error.response.data);
    }
  }
}
