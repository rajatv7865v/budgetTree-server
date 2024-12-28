import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CustomHttpException } from 'src/core/exceptions';
import { CreateCampaignDTO } from './dto/creaateCampaign.dto';
import { ProductService } from '../product/product.service';

@Injectable()
export class CampaignService extends ProductService {
  async createCampaign(
    createCampaignDTO: CreateCampaignDTO,
    token: string,
  ): Promise<any> {
    const { denomination, name, sku } = createCampaignDTO;
    try {
      const url: string = 'https://app.budgetree.in/account/campaign/';
      const response = await axios.post(
        url,
        {
          name,
          sku,
          denomination,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('Access Token Response:', response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new CustomHttpException(error);
    }
  }
  async getCampaign(token: string): Promise<any> {
    try {
      const url: string = 'https://app.budgetree.in/account/campaign';
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Access Token Response:', response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new CustomHttpException(error);
    }
  }
}
