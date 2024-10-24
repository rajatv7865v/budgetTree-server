import { Module } from '@nestjs/common';
import { ZohoService } from './zoho.service';
import { ZohoController } from './zoho.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ZohoController],
  providers: [ZohoService],
})
export class ZohoModule {}
