import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from "@nestjs/platform-express";
import { multerOptions } from "./multer.options";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Post('file-upload')
    @UseInterceptors(FileInterceptor("file", multerOptions))
    fileUpload(@UploadedFile() file: Express.Multer.File) {
        console.log(file);
        return `${file.originalname} File Uploaded check http://localhost:3000/uploads/${file.filename}`;
    }
}
