import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCityDto, UpdateCityDto } from './dto/create-city.dto';

export interface CitiesDTO {
  id: string;
  name: string;
}

@Injectable()
export class CitiesService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<CitiesDTO[]> {
    const cities = await this.prisma.cities.findMany();

    return cities;
  }

  async create(createCityDto: CreateCityDto) {
    const city = await this.prisma.cities.create({
      data: {
        name: createCityDto.name,
      },
    });

    return city;
  }

  async getById(id: string): Promise<CitiesDTO> {
    const city = await this.prisma.cities.findUnique({
      where: { id },
    });

    if (!city) {
      throw new Error('City not found');
    }

    return city;
  }

  async deleteById(id: string): Promise<void> {
    await this.prisma.cities.delete({
      where: { id },
    });
  }

  async updateById(
    id: string,
    updateCityDto: UpdateCityDto,
  ): Promise<CitiesDTO> {
    const result = await this.prisma.cities.update({
      where: { id },
      data: updateCityDto,
    });

    return result;
  }
}
