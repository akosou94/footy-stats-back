import { Test, TestingModule } from '@nestjs/testing';
import { FootyService } from './footy.service';

describe('FootyService', () => {
  let service: FootyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FootyService],
    }).compile();

    service = module.get<FootyService>(FootyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
