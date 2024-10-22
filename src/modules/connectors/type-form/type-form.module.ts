import { Module } from '@nestjs/common';
import { TypeFormService } from './type-form.service';
import { TypeFormController } from './type-form.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [TypeFormController],
  providers: [TypeFormService],
})
export class TypeFormModule {}
