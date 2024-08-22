/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { json } from 'body-parser';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(process.cwd() + '/secrets/private-key.pem'),
    cert: fs.readFileSync(process.cwd() + '/secrets/certificate.pem'),
  };
  const app = await NestFactory.create(AppModule, { httpsOptions });

  // Set global prefix
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // Enable CORS
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'https://local.music.davidsmithweb.com:4200',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // This is important for sessions or basic auth
  });

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
    Logger.log('Listening at https://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
