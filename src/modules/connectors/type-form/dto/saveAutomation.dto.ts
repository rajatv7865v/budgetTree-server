import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class SaveAutomationDto {
  @IsOptional()
  @IsString()
  readonly formId: string;
  @IsOptional()
  @IsString()
  readonly question?: string;
  @IsOptional()
  @IsString()
  readonly campaignId: string;
  @IsOptional()
  @IsString()
  readonly expiry: string;

  @IsOptional()
  @IsString()
  readonly approvalType: string;
}
