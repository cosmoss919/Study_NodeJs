import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";
import { User } from 'src/user/user.entity';
import { UserService } from "../user/user.service";
import * as process from "process";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/google',
            scope: ['email', 'profile'],
            accessType: 'offline',
            prompt:'consent'
        });
    }

    // OAuth 인증이 끝나고 콜백으로 실행되는 메서드
    async validate(accessToken: string, refreshToken: string, profile: Profile) {
        const { id, name, emails } = profile;
        console.log("accessToken : " + accessToken);
        console.log("refreshToken : " + refreshToken);

        const providerId = id;
        const email = emails[0].value;

        // 유저 정보 저장 혹은 가져오기
        const user: User = await this.userService.findByEmailOrSave(email, name.familyName + name.givenName, providerId);
        return user;
    }
}