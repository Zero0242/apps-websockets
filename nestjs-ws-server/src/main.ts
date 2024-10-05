import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();

  await app.listen(envs.PORT, () =>
    Logger.log(`Corriendo en el puerto ${envs.PORT}`, 'Main'),
  );
}
bootstrap();
