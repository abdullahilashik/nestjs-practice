import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PostsModule } from './posts/posts.module.js';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerModule } from './scheduler/scheduler.module.js';
import { CatsService } from './cats/cats.service.js';
import { CatsList, MockCatService } from './cats/mock.cat.service.js';

@Module({
  imports: [

    ScheduleModule.forRoot(),
    SchedulerModule,

    ConfigModule.forRoot({
      isGlobal: true
    }),
    PostsModule,
    // CatsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CatsService,
    {
      provide: 'CAT_SERVICE',
      useClass: process.env.NODE_ENV == 'development' ? MockCatService : CatsService
    },
    {
      provide: 'CAT_DATA',
      useValue: CatsList
    }
  ],
})
export class AppModule { }
