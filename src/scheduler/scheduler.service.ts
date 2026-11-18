import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, SchedulerRegistry, Timeout } from '@nestjs/schedule';

@Injectable()
export class SchedulerService {
    
    private readonly logger = new Logger(SchedulerService.name);

    constructor(
        private readonly schedulerRegistry: SchedulerRegistry
    ) {}

    // schedule basic
    @Cron('*/10 * * * * *', {
        name : 'cron'
    }) // everyday at 3
    basicCron() {
        const job = this.schedulerRegistry.getCronJob('cron');
        this.logger.warn(`Basic logger running per second..! ${new Date().getTime()}`)
        this.logger.error(`Next scheduled time is: ${job.nextDate()}`);

        const dates = job.nextDates();
        // this.logger.log(job.nextDate);
    }

    // interval
    @Interval('notification', 1000 * 10)
    perTenSecondsInterval() {
        this.logger.log(`This code runs in every ${new Date().getTime()} seconds!`);
    }

    // timeout
    @Timeout('timeout', 10 * 1000)
    timeoutInTenSeconds() {
        this.logger.warn(`Timeout triggered after ${new Date().getTime()} seconds`);
    }

    // Clear cron job, interval and timeout
    clearCrons(
        cronName: string,
        intervalName: string,
        timeoutName: string
    ) {
        const cronJob = this.schedulerRegistry.getCronJob(cronName);   
        cronJob.stop(); // stop the cron job immediately

        const interval = this.schedulerRegistry.getInterval(intervalName);
        clearInterval(interval);

        const timeout = this.schedulerRegistry.getTimeout(timeoutName);
        clearTimeout(timeout);

        this.logger.log('All named cron job, interval and timeout cleared');

        return 'All named cron job, interval and timeout cleared';
    }

    // update existing cron job by name

    updateCronJob() {
        const job = this.schedulerRegistry.getCronJob('cron');

        // stop the job 
        job.stop(); // stop the job
        this.logger.warn(`Stopped job last ran ${job.lastDate()}`);
        this.logger.fatal(`Next scheduled time is`)

        return true;
    }

    // add dynamic cron job
    // add dynamic interval
    // add dynamic timeout
}
