import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCampaignDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsNumber()
  @IsNotEmpty()
  denomination: number;
}
