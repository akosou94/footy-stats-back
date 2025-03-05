import { Body, Controller, Get, Req } from '@nestjs/common';
import { CitiesService } from './cities.service';

@Controller('cities')
export class CitiesController {
  constructor(private citiesService: CitiesService) {}

  @Get('cities')
  async cities(@Req()) {
    const result = await this.citiesService.getCities();

    return result;
  }
}
