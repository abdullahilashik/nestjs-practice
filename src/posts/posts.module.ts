import { Module } from '@nestjs/common';
import { PostsService } from './posts.service.js';
import { PostsController } from './posts.controller.js';

@Module({
  providers: [
    // PostsService,
    {
      provide: 'POST_SERVICE',
      useClass: PostsService
    }
  ],
  controllers: [PostsController]
})
export class PostsModule {}
