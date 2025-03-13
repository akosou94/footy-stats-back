import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Match, MatchInfoByYear } from './dto/matches-dto';

@Injectable()
export class MatchesService {
  private readonly apiToken = process.env.API_TOKEN_MATCHES;
  private readonly baseUrl = 'https://api.football-data.org';

  constructor(private readonly httpService: HttpService) {}

  async getMatches(
    dateFrom: string,
    dateTo: string,
  ): Promise<{ matches: Match[] }> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<{ matches: Match[] }>(
          `${this.baseUrl}/v4/matches`,
          {
            headers: {
              'X-Auth-Token': this.apiToken,
            },
            params: {
              dateFrom,
              dateTo,
              permission: 'TIER_THREE',
            },
          },
        ),
      );
      return response.data;
    } catch (error) {
      throw new Error(`Ошибка получения матчей: ${error.message}`);
    }
  }

  async getMatchesDataByYear(code: string = 'PL'): Promise<MatchInfoByYear> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<Promise<MatchInfoByYear>>(
          `${this.baseUrl}/v4/competitions/${code}/standings`,
          {
            headers: {
              'X-Auth-Token': this.apiToken,
            },
            params: {
              season: '2024',
            },
          },
        ),
      );
      return response.data;
    } catch (error) {
      throw new Error(
        `Ошибка получения матчей за текущий сезон: ${error.message}`,
      );
    }
  }
}
