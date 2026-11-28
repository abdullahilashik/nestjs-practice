import { Test, TestingModule } from '@nestjs/testing';
import { MonoovaController } from './monoova.controller.js';

describe('MonoovaController', () => {
  let controller: MonoovaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonoovaController],
    }).compile();

    controller = module.get<MonoovaController>(MonoovaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
