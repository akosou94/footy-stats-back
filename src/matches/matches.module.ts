import { Module } from '@nestjs/common';
import { MatchesController } from './matches.controller';
import { MatchesService } from './matches.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfig } from '../config/configuration';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<AppConfig>) => {
        const apiMatchesConfig =
          configService.get<AppConfig['apiMatches']>('apiMatches');

        return {
          baseURL: apiMatchesConfig?.url,
          headers: {
            'X-Auth-Token': apiMatchesConfig?.token,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [MatchesController],
  providers: [MatchesService],
})
export class MatchesModule {}
