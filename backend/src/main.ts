import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  const frontend = process.env.FRONTEND_URL ?? 'http://localhost:5173';
  app.enableCors({
    origin: [frontend, 'http://127.0.0.1:5173'],
    credentials: true,
  });
  const port = Number(process.env.PORT) || 3000;
  await app.listen(port);
}
bootstrap();
