/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { json } from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set global prefix
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // Increase the limit for JSON bodies
  app.use(json({ limit: '50mb' }));

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Example API')
    .setDescription('The example API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
