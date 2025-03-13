import { Controller, Get, Query } from '@nestjs/common';
import { MatchesService } from './matches.service';

@Controller('matches')
export class MatchesController {
  constructor(private matchesService: MatchesService) {}

  @Get()
  async getMatches(
    @Query('dateFrom') dateFrom: string,
    @Query('dateTo') dateTo: string,
  ) {
    return this.matchesService.getMatches(dateFrom, dateTo);
  }

  @Get('by-year')
  async getMatchesDataByYear(@Query('code') code: string) {
    return this.matchesService.getMatchesDataByYear(code);
  }
}
