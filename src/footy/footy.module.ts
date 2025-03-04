import { Module } from '@nestjs/common';
import { FootyController } from './footy.controller';
import { FootyService } from './footy.service';

@Module({
  controllers: [FootyController],
  providers: [FootyService]
})
export class FootyModule {}
