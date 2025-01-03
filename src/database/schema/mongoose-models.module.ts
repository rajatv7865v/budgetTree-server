import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AUTOMATION_MODEL, AutomationSchema } from './automation';

const MODELS = [{ name: AUTOMATION_MODEL, schema: AutomationSchema }];
@Global()
@Module({
  imports: [MongooseModule.forFeature(MODELS)],
  exports: [MongooseModule],
})
export class MongooseModelsModule {}
