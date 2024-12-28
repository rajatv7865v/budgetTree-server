import { Module } from '@nestjs/common';
import { TypeFormModule } from './connectors/type-form/type-form.module';
import { ZohoModule } from './connectors/zoho/zoho.mdule';
import { HubspotModule } from './connectors/hubspot/hubspot.module';
import { ZoomModule } from './connectors/zoom/zoom.module';
import { ProductModule } from './product/product.module';
import { SurveyMonkeyModule } from './connectors/survey-monkey/surveyMonkey.module';
import { CampaignModule } from './campaign/campaign.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    TypeFormModule,
    ZohoModule,
    HubspotModule,
    ZoomModule,
    ProductModule,
    SurveyMonkeyModule,
    CampaignModule,
  ],
  controllers: [],
  providers: [],
})
export class ModulesModule {}
