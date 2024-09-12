import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';
import * as process from "process";
import config from './configs/config';

console.log('env : ' + process.env.NODE_ENV);

@Module({
  imports: [
      ConfigModule.forRoot({
      isGlobal: true, // 전역 모듈 설정 추가
      envFilePath: `${process.cwd()}/envs/${process.env.NODE_ENV}.env`, //환경변수 파일 경로 지정
      load: [config],   //커스텀 config
      cache: true,  //캐시 여부
      expandVariables: true,    //확장 변수 옵션 추가
  }),
    WeatherModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
