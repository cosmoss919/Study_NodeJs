import  { Body, Controller, Get, Post, Param, Put, Delete } from "@nestjs/common";
import { User } from './user.entity';
import { UserService } from "./user.service";
import { CreateUserDto, UpdateUserDto } from "./user.dto";

@Controller('user') //주소가 user로 시작됨
export class UserController {
    constructor(private userService: UserService) {}    //유저 서비스 주입

    @Post('/create')
    createUser(@Body() user: CreateUserDto) {
        return this.userService.createUser(user);
    }

    @Get('/getUser/:email')
    async getUser(@Param('email') email: string) {
        const user = await this.userService.getUser(email);
        console.log(user);
        return user;
    }

    @Put('/update/:email')
    updateUser(@Param('email') email: string, @Body() user: UpdateUserDto) {
        console.log(user);
        return this.userService.updateUser(email, user);
    }

    @Delete('/delete/:email')
    deleteUser(@Param('email') email: string) {
        return this.userService.deleteUser(email);
    }
}
