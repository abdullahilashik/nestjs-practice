import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';
import {Cron} from '@nestjs/schedule';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Cron('*/5 * * * * *') // beats every 5 seconds
  sayHello() {
    console.log('Hello from the other side!');
  }

  // every minutes on 15th seconds
  // every value seems to be deeply related to the value on right
  // * at 15's right means every minutes and 15 means at 15th second
  // so every minutes on 15th second; but it does not mean every 15 seconds interval
  @Cron('15 * * * * *')
  onEvery15thSeconds() {
    console.log('Hello on every 15th second!');
  }
}
