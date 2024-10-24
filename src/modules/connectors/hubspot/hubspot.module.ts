import { Module } from '@nestjs/common';
import { HubSpotService } from './hubspot.service';
import { HubSpotController } from './hubspot.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [HubSpotController],
  providers: [HubSpotService],
})
export class HubspotModule {}
