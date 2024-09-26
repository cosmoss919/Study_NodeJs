import { Body, Controller, Get, Post, Request, Response, UseGuards } from '@nestjs/common';
import { CreateUserDto } from "../user/user.dto";
import { AuthService } from "./auth.service";
import { AuthenticatedGuard, LocalAuthGuard, LoginGuard } from "./auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    //calss-validator가 자동으로 유효성 검증
    async register(@Body() userDto: CreateUserDto) {
        return await this.authService.register(userDto);
    }

    @Post('login')
    async login(@Request() req, @Response() res){
        const userInfo = await this.authService.validateUser(
            req.body.email,
            req.body.password,
        );

        if(userInfo) {
            res.cookie('login', JSON.stringify(userInfo), {
                httpOnly: true,    //브라우저에서 읽을 수 있도록 함, true로 해놓는것이 보안에 유리함
                maxAge: 1000 * 60 * 60 * 24 * 7,    //7day, 단위는 밀리초
            });
        }

        return res.send({message: 'Login success'});
    }

    @UseGuards(LoginGuard)
    @Post('login2')
    async login2(@Request() req, @Response() res){
        // 쿠키 정보는 없지만 request에 유저 정보가 있다면 응답값에 쿠키 정보 추가
        if(!req.cookies['login'] && req.user) {
            // 응답에 쿠키 정보 추가
            res.cookie('login', JSON.stringify(req.user), {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24,
            });
        }
        return res.send({message: 'Login success'});
    }

    @UseGuards(LoginGuard)
    @Get('test-guard')
    testGuard() {
        return '로그인 된 때만 이 글이 보입니다.';
    }

    @UseGuards(LocalAuthGuard)
    @Post('login3')
    login3(@Request() req){
        return req.user;
    }

    @UseGuards(AuthenticatedGuard)
    @Get('test-guard2')
    testGuardWithSession(@Request() req) {
        return req.user;
    }
}
