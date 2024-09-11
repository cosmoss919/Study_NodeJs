import {PostDto} from './blog.model'  // 게시글의 타입 정보 임포트
import {BlogMongoRepository} from "./blog.repository";
import {Injectable} from "@nestjs/common";

@Injectable()
export class BlogService {
    constructor(private blogRepository: BlogMongoRepository) {}

    async getAllPosts() {
        return await this.blogRepository.getAllPost();
    }

    createPost(postDto: PostDto) {
        this.blogRepository.createPost(postDto);
    }

    async getPost(id) {
        return await this.blogRepository.getPost(id);
    }

    delete(id) {
        this.blogRepository.deletePost(id);
    }

    updatePost(postDtd: PostDto) {
        this.blogRepository.updatePost(postDtd);
    }
}