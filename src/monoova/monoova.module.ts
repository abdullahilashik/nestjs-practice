import { Module } from '@nestjs/common';
import { MonoovaService } from './monoova.service.js';
import { MonoovaController } from './monoova.controller.js';

@Module({
  providers: [MonoovaService],
  controllers: [MonoovaController]
})
export class MonoovaModule {}
