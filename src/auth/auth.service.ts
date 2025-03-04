import { Inject, Injectable } from '@nestjs/common';
import { UserDTO, UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

export interface CredentialsDTO {
  username: string;
  password: string;
}

export interface TokenPayload {
  id: string;
  username: string;
}

export interface TokensDTO {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    @Inject('AccessJwtService') private jwtAccessService: JwtService,
    @Inject('RefreshJwtService') private jwtRefreshService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getByUsername(username);

    const isMatched = await this.usersService.validatePassword(
      pass,
      user.password,
    );

    if (isMatched) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  private async makeTokensFromUser(user: UserDTO): Promise<TokensDTO> {
    const tokenPayload: TokenPayload = {
      id: user.id,
      username: user.username,
    };

    const token = await this.jwtAccessService.signAsync(tokenPayload);

    const refresh = await this.jwtRefreshService.signAsync(tokenPayload);

    return { accessToken: token, refreshToken: refresh };
  }

  async signup(credentials: CredentialsDTO) {
    const user = await this.usersService.create(credentials);

    return this.makeTokensFromUser(user);
  }

  async signin(credentials: CredentialsDTO) {
    const user = await this.usersService.getByUsername(credentials.username);

    const isMatched = await this.usersService.validatePassword(
      credentials.password,
      user.password,
    );

    if (!isMatched) {
      throw new Error('Invalid credentials');
    }

    return this.makeTokensFromUser(user);
  }

  async refresh(refreshToken: string): Promise<TokensDTO> {
    const payload =
      await this.jwtRefreshService.verifyAsync<TokenPayload>(refreshToken);

    const newPayload: TokenPayload = {
      id: payload.id,
      username: payload.username,
    };

    const newAccessToken = await this.jwtAccessService.signAsync(newPayload);
    const newRefreshToken = await this.jwtRefreshService.signAsync(newPayload);

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  async me(userId: string) {
    const user = await this.usersService.getById(userId);

    return user;
  }
}
