import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateCampaignDTO } from './dto/creaateCampaign.dto';
import { CampaignService } from './campaign.service';
import { CustomHttpException } from 'src/core/exceptions';

@Controller('campaign')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post('create')
  async createCampaign(@Body() createCampaignDTO: CreateCampaignDTO) {
    try {
      const token: string = await this.campaignService.getToken();

      return this.campaignService.createCampaign(createCampaignDTO, token);
    } catch (error) {
      throw new CustomHttpException(error);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('get-all')
  async getCampaign() {
    try {
      console.log('hit');
      const token: string = await this.campaignService.getToken();
      console.log('token', token);
      const campaign = this.campaignService.getCampaign(token);
      console.log(campaign);
      return campaign;
    } catch (error) {
      throw new CustomHttpException(error);
    }
  }
}
