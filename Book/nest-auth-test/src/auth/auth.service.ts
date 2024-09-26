import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from "../user/user.dto";
import { UserService } from "../user/user.service";
import * as bcrypt from 'bcrypt';
import {User} from "../user/user.entity";

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async register(userDto: CreateUserDto){
        // 이미 가입된 유저가 있는지 체크
        const user = await this.userService.getUser(userDto.email);
        if(user) {
            throw new HttpException(
                '해당 유저가 이미 있습니다.',
                HttpStatus.BAD_REQUEST,
            );
        }

        //패스워드 암호화
        const encryptedPassword = bcrypt.hashSync(userDto.password, 10);    //2번째 인자는 암호화 할 횟수

        //데이터 베이스에 저장. 저장 중 에러가나면 서버 에러 발생
        try {
            const user = await this.userService.createUser({
                ...userDto,
                password: encryptedPassword,
            });

            //회원 가입 후 반환 값에는 password를 주지 않음
            user.password = undefined;
            return user;
        } catch (e){
            throw new HttpException('서버 에러', 500);
        }
    }

    async validateUser(email: string, password: string){
        const user = await this.userService.getUser(email);

        if(!user) {
            return null;
        }

        const { password: hashedPassword, ...userInfo } = user;
        if(bcrypt.compareSync(password, hashedPassword)) {
            return userInfo;
        }

        return null;
    }
}
