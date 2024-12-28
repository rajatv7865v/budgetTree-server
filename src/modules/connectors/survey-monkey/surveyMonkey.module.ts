import { Module } from '@nestjs/common';
import { SurveyMonkeyService } from './surveyMonkey.service';
import { SurveyMonkeyController } from './surveyMonkey.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [SurveyMonkeyController],
  providers: [SurveyMonkeyService],
})
export class SurveyMonkeyModule {}
