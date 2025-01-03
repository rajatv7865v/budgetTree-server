import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformResponseInterceptor } from './core/interceptors/response.interceptors';
import mongoose from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://integrations.budgetree.in', // Your frontend origin (Change this to the correct origin if necessary)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const configService = await app.get(ConfigService);
  mongoose.set('debug', true);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api/v1');
  app.useGlobalInterceptors(new TransformResponseInterceptor());

  //IMPLEMENT SWAGGER
  const config = new DocumentBuilder()
    .setTitle('BudgetTree-server APIs')
    .setDescription('This is for test of BudgetTree-server APIs')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(configService.get('APP.APP_PORT'));
  Logger.log(`Server started at ${configService.get('APP.APP_PORT')}`);
}
bootstrap();
