import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import type { IPost } from './dto/post.dto.js';
import { PostsService } from './posts.service.js';

@Controller('posts')
export class PostsController {

    constructor(private readonly postService: PostsService) {}

    // create a new post
    @Post('create')
    async create(@Body() body: IPost) {
        return await this.postService.createPost(body);
    }
    // get all posts
    @Get()
    async fetchAll() {
        const response : IPost[] = await this.postService.fetchAll();
        return {
            "data": response,
            "count" : response.length || 0
        }
    }
    // remove a post
    @Delete('/delete/:id')
    async deletePost(@Param('id') id: string) {        
        const response = await this.postService.deletePost(id);        
        
        return {
            "data" : response,
            "count" : response.length || 0
        }
    }
    // update a post
}
