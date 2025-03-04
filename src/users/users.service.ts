import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

interface CreateUserDTO {
  username: string;
  password: string;
}

export interface UserDTO {
  id: string;
  username: string;
  password: string;
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getById(id: string): Promise<UserDTO> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async getByUsername(username: string): Promise<UserDTO> {
    const user = await this.prisma.user.findUnique({ where: { username } });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async create(data: CreateUserDTO) {
    const encryptedPassword = await this.encryptPassword(data.password);

    return this.prisma.user.create({
      data: { username: data.username, password: encryptedPassword },
    });
  }

  public validatePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  private async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();

    const hash = await bcrypt.hash(password, salt);

    return hash;
  }
}
