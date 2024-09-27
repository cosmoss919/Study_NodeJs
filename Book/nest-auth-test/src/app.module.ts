import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule} from "@nestjs/typeorm";
import { User } from 'src/user/user.entity';
import { AuthModule } from './auth/auth.module';
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'sqlite', //데이터 베이스의 타입
        database: 'nest-auth-test.sqlite',  //데이터 베이스 파일명
        entities: [User], //엔티티 리스트
        synchronize: true,  //데이터베이스에 스키마를 동기화, 개발단계에서만 사용해야함 의도치않게 스키마를 변경할 수 도 있음
        logging: true,  //SQL 실행 로그 확인
      }),
    UserModule,
    AuthModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
