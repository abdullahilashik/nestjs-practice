import { Controller, Get, Logger, Query } from '@nestjs/common';
import { SchedulerService } from './scheduler.service.js';

@Controller('scheduler')
export class SchedulerController {
    private readonly logger = new Logger(SchedulerController.name);

    constructor(
        private readonly schedulerService: SchedulerService
    ) { }


    @Get()
    index() {
        this.schedulerService.updateCronJob(); // perform update operation on cron job

        return {
            'msg': 'Update has been performed'
        }
    }

    @Get('jobs')
    getAllJobs() {
        const response = this.schedulerService.getAllJobs();
        return {
            msg: 'All jobs retrieved',
            jobs: response
        }
    }


    // clear the named crons
    @Get('/clear-named')
    clearNamedCrons(
        @Query('cron') cronName: string,
        @Query('interval') intervalName: string,
        @Query('timeout') timeoutName: string
    ) {
        const msg = this.schedulerService.clearCrons(cronName, intervalName, timeoutName);

        return {
            msg
        }
    }
}
