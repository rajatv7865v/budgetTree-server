import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ProductService {
  private readonly baseURL: string = 'https://app.budgetree.in/account';
  private readonly getTokenAPI: string = 'generate/jwt/token/';

  async getToken(): Promise<string> {
    try {
      const { data }: any = await axios.post(
        `${this.baseURL}/${this.getTokenAPI}`,
        {
          client_id: 'lK51YN2UGOmHE8YWiMviSVWyqkH8qMVA',
          client_secret: 'k2YYvKUQEb7FdGFfaRpNHSNmayUned3M',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return data?.access_token;
    } catch (error) {}
  }
}
