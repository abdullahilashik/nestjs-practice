import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class SchedulerService {
    private readonly logger = new Logger(SchedulerService.name);

    // schedule basic
    @Cron('* 10 * * * *') // every hour on 10th minutes
    basicCron() {
        this.logger.warn(`Basic logger running per second..! ${new Date().getTime()}`)
    }
}
