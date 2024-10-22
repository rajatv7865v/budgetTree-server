import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeFormModule } from './modules/connectors/type-form/type-form.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      expandVariables: true,
      cache: true,
      isGlobal: true,
      load: configuration,
    }),
    TypeFormModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
