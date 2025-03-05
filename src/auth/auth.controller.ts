import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService, CredentialsDTO, TokenPayload } from './auth.service';
import { JwtAuthGuard } from './guards';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  async signup(@Body() body: CredentialsDTO) {
    const result = await this.authService.signup(body);

    return result;
  }

  @Post('sign-in')
  async signin(@Body() body: CredentialsDTO) {
    const result = await this.authService.signin(body);

    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Post('me')
  async me(@Req() req: Request) {
    const userID = (req.user as TokenPayload).id;

    return await this.authService.me(userID);
  }

  @Post('refresh')
  async refresh(@Body() body: { refreshToken: string }) {
    const result = await this.authService.refresh(body.refreshToken);

    return result;
  }
}
