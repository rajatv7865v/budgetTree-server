import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import axios, { AxiosResponse } from 'axios';
import { json } from 'stream/consumers';
import { PaginationDto } from './dto/pagination.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  private readonly baseURL: string = 'https://app.budgetree.in/account';
  private readonly getToken: string = 'generate/jwt/token/';
  private readonly getProductsAPI: string = 'product/api';

  @Get('get-all')
  @HttpCode(HttpStatus.OK)
  async getProducts(@Query() paginationDto: PaginationDto): Promise<any> {
    try {
      const { limit, page = 1, search = '' } = paginationDto;
      console.log(limit, page, search);
      const { data }: any = await axios.post(
        `${this.baseURL}/${this.getToken}`,
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
      const response: any = await axios.get(
        `${this.baseURL}/${this.getProductsAPI}`,
        {
          headers: {
            Authorization: `Bearer ${data?.access_token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      let products = response.data.products; // Access only the data part
      const start: number = (page - 1) * limit;
      const end = Number(start) + Number(limit);
      let productData = products?.slice(start, end);
      productData = productData.filter((item: any) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
      return { data: productData };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.response?.data || 'Failed to fetch data from third-party API',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
