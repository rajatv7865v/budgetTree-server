import { Module } from '@nestjs/common';
import { TypeFormModule } from './connectors/type-form/type-form.module';

@Module({
  imports: [TypeFormModule],
  controllers: [],
  providers: [],
})
export class ModulesModule {}
