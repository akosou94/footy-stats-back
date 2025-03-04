import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies';
import { ConfigService } from '@nestjs/config';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, PassportModule, NestJwtModule.register({})],
  providers: [
    ConfigService,
    AuthService,
    JwtStrategy,
    {
      provide: 'RefreshJwtService',
      useFactory: (configService: ConfigService) => {
        return new JwtService({
          secret: configService.get('jwt.refreshSecret'),
          signOptions: { expiresIn: configService.get('jwt.refreshExpiresIn') },
        });
      },
      inject: [ConfigService],
    },
    {
      provide: 'AccessJwtService',
      useFactory: (configService: ConfigService) => {
        return new JwtService({
          secret: configService.get('jwt.accessSecret'),
          signOptions: { expiresIn: configService.get('jwt.accessExpiresIn') },
        });
      },
      inject: [ConfigService],
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
