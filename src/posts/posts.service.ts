import { Delete, Injectable, Param } from '@nestjs/common';
import type { IPost } from './dto/post.dto.js';
import {randomUUID} from 'crypto';

@Injectable()
export class PostsService {
    private posts : IPost [] = [];

    // create a new post
    async createPost(body: IPost) : Promise<IPost[]> {
        const uuid = randomUUID();

        this.posts.push({
            id: uuid,
            ...body
        })
        return this.posts;
    }
    // get all post
    async fetchAll() : Promise<IPost[]> {
        return await this.posts;
    }
    // delete a post    
    async deletePost (id: string) : Promise<IPost[]> {
        const ifExists = this.posts.find(item => item.id == id);
        if(!ifExists) {
            return [];
        }
        this.posts = this.posts.filter(
            item => item.id !== id
        )          
        return this.posts;
    }
    // update a post
}
