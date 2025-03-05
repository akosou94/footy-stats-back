import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface CitiesDTO {
  id: string;
  name: string;
}

export interface CitiesCredentials {
  id: string;
  name: string;
}

@Injectable()
export class CitiesService {
  constructor(private prisma: PrismaService) {}

  async getCities(): Promise<CitiesDTO> {
    const city = await this.prisma.cities);

    if (!city) {
      throw new Error('city not found');
    }

    return city;
  }
}
