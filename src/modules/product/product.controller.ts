import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ProductService } from './product.service';
import axios, { AxiosResponse } from 'axios';
import { json } from 'stream/consumers';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  private readonly baseURL: string = 'https://app.budgetree.in/account';
  private readonly getToken: string = 'generate/jwt/token/';
  private readonly getProductsAPI: string = 'product/api';

  @Get('get-all')
  @HttpCode(HttpStatus.OK)
  async getProducts(): Promise<any> {
    try {
      // const { data }: any = await axios.post(
      //   `${this.baseURL}/${this.getToken}`,
      //   {
      //     client_id: 'lK51YN2UGOmHE8YWiMviSVWyqkH8qMVA',
      //     client_secret: 'k2YYvKUQEb7FdGFfaRpNHSNmayUned3M',
      //   },
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //   },
      // );
      // console.log(data);
      const { data }: any = await axios.get(
        `${this.baseURL}/${this.getProductsAPI}`,
        {
          headers: {
            Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiJsSzUxWU4yVUdPbUhFOFlXaU12aVNWV3lxa0g4cU1WQSIsImV4cCI6MTczNDA2MzA5MCwiaWF0IjoxNzMxNDcxMDkwfQ.HQCwyvMNwyLG37ITxyHWYvJp3iJ4xuVGma4uanrFArM'}`,
            'Content-Type': 'application/json',
          },
          responseType: 'json',
        },
      );
      console.log('data', data);

      return { data };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.response?.data || 'Failed to fetch data from third-party API',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
