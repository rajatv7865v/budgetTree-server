import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  const configService = await app.get(ConfigService);
  console.log(configService.get('APP.APP_PORT'));

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api/v1');

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
