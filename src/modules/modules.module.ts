import { Module } from '@nestjs/common';
import { TypeFormModule } from './connectors/type-form/type-form.module';
import { ZohoModule } from './connectors/zoho/zoho.mdule';
import { HubspotModule } from './connectors/hubspot/hubspot.module';
import { ZoomModule } from './connectors/zoom/zoom.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    TypeFormModule,
    ZohoModule,
    HubspotModule,
    ZoomModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class ModulesModule {}
