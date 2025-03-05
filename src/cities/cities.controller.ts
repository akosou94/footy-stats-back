import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CreateCityDto, UpdateCityDto } from './dto/create-city.dto';

@Controller('cities')
export class CitiesController {
  constructor(private citiesService: CitiesService) {}

  @Get()
  async cities() {
    const result = await this.citiesService.getAll();

    return result;
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    const result = await this.citiesService.getById(id);

    return result;
  }

  @Post()
  async create(@Body() createCityDto: CreateCityDto) {
    const result = await this.citiesService.create(createCityDto);

    return result;
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.citiesService.deleteById(id);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
    return await this.citiesService.updateById(id, updateCityDto);
  }
}
