import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MatchesModule } from './matches/matches.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { config } from './config/configuration';
import { CitiesController } from './cities/cities.controller';
import { CitiesModule } from './cities/cities.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    UsersModule,
    MatchesModule,
    PrismaModule,
    AuthModule,
    CitiesModule,
  ],
  controllers: [AppController, CitiesController],
  providers: [AppService],
})
export class AppModule {}
