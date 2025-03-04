import { Test, TestingModule } from '@nestjs/testing';
import { FootyController } from './footy.controller';

describe('FootyController', () => {
  let controller: FootyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FootyController],
    }).compile();

    controller = module.get<FootyController>(FootyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
