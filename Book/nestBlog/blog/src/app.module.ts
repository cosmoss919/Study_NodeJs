import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {BlogController} from './blog.controller'
import {BlogFileRepository, BlogMongoRepository} from "./blog.repository";
import {Blog, BlogSchema} from "./blog.schema";
import {BlogService} from './blog.service'

@Module({
    imports: [
        // 몽고디비 연결 설정
        MongooseModule.forRoot(
            'mongodb+srv://najin:SKwls123@cluster0.yu0zg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/blog',
        ),
         MongooseModule.forFeature([{name: Blog.name, schema: BlogSchema}]),
    ],
    controllers: [BlogController],
    providers: [BlogService, BlogFileRepository, BlogMongoRepository],
})
export class AppModule {
}
