import { Test, TestingModule } from '@nestjs/testing';
import { MonoovaService } from './monoova.service.js';

describe('MonoovaService', () => {
  let service: MonoovaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MonoovaService],
    }).compile();

    service = module.get<MonoovaService>(MonoovaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
