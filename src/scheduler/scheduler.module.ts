import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service.js';
import { SchedulerController } from './scheduler.controller.js';

@Module({
  providers: [SchedulerService],
  controllers: [SchedulerController]
})
export class SchedulerModule {}
