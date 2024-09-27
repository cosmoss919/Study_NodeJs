import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'static'));  // 정적 파일 경로 지정
  await app.listen(3000);
}
bootstrap();
