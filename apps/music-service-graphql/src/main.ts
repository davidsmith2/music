/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(process.cwd() + '/secrets/private-key.pem'),
    cert: fs.readFileSync(process.cwd() + '/secrets/certificate.pem'),
  };
  const app = await NestFactory.create(AppModule, { httpsOptions});

  const globalPrefix = 'graphql';
  app.setGlobalPrefix(globalPrefix);

  app.enableCors({
    origin: [
      'http://localhost:4200',
      'https://local.music.davidsmithweb.com:4200',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // This is important for sessions or basic auth
  });

  const port = process.env.PORT || 3000;

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: https://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
