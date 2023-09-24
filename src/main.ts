import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      skipMissingProperties: true,
    }),
  );

  const [port, NODE_ENV] = [3000, 'dev'];
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port} Environment: ${NODE_ENV}`,
  );
}

bootstrap();
