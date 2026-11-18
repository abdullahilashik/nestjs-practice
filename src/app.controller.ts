import { Controller, Get, Logger, Query } from '@nestjs/common';
import { AppService } from './app.service.js';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Controller()
export class AppController {

  private readonly logger = new Logger(AppController.name);

  constructor(
    private readonly appService: AppService,
    private readonly scheduleRegistry: SchedulerRegistry
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/stop')
  stopCron() {
    // const interval = this.scheduleRegistry.getInterval('notification');
    // interval.stop(); // stop the cron job
    const cronJobs = this.scheduleRegistry.getCronJob('CRON_EXPRESSION_TEST');

    cronJobs.stop(); // stop the cron
    return {
      'msg': 'Cron job has been stopped'
    }
  }

  // @Cron('*/5 * * * * *') // beats every 5 seconds
  sayHello() {
    console.log(`Hello from the other side! ${new Date().getTime()}`);
  }

  // every minutes on 15th seconds
  // every value seems to be deeply related to the value on right
  // * at 15's right means every minutes and 15 means at 15th second
  // so every minutes on 15th second; but it does not mean every 15 seconds interval
  // @Cron('15 * * * * *')
  onEvery15thSeconds() {
    console.log(`Hello on every 15th second! ${new Date().getTime()}`);
  }

  // try out cron expression
  @Cron(CronExpression.EVERY_SECOND, {
    name: 'CRON_EXPRESSION_TEST',
    // timeZone: 'Asia/Dhaka',
    // utcOffset: +6,
    waitForCompletion: true,
    disabled: true
  })
  cronExpressionTest() {
    console.log('Con expression test applied!')
  }

  // @Interval('notification', 1000)
  // intervalTest() {
  //   console.log(`Interval test running ok`);
  // }

  // add cron job
  @Get('create-crone')
  createCron(@Query('name') name: string, @Query('seconds') seconds: string) {
    this.addCronJob(name, seconds);

    return {
      message: "Cron job started!"
    }
  }

  addCronJob(name: string, seconds: string) {
    const job = new CronJob(`${seconds} * * * * *`, function () {
      console.log(`CronJob ${name} scheduled to run for ${seconds} seconds`);
    });

    this.scheduleRegistry.addCronJob(name, job);
    job.start(); // cron job started

    this.logger.warn(`CronJob ${name} started....!`);

  }
}
