import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from "passport";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); //전역 파이프에 validationPipe 객체 추가
  app.use(cookieParser());
  app.use(
      session({
          secret: 'very-important-secret',  //세션 암호화에서 사용되는 키
          resave: false,            //세션을 항상 저장할지 여부
          saveUninitialized: false, //세션이 저장되기 전 빈 값을 저장할지 여부
          cookie: { maxAge: 3600000 },  //1시간
      }),
  );
  //passport 초기화 및 세션 저장소 초기화
    app.use(passport.initialize());
    app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
