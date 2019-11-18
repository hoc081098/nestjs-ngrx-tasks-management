import {Logger, ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import * as config from 'config';
import {AppModule} from './app.module';

async function bootstrap() {
  const serverConfig = config.get('server');
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);
  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  }

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);

  logger.log(`NODE_ENV: ${process.env.NODE_ENV}`);
  logger.log(`Application is running at port ${port}...`);
}

bootstrap();
