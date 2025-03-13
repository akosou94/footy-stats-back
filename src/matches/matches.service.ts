import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {
  catchError,
  firstValueFrom,
  lastValueFrom,
  map,
  throwError,
} from 'rxjs';
import { Match, MatchInfoByYear } from './dto/matches-dto';
import { AxiosError } from 'axios';

@Injectable()
export class MatchesService {
  constructor(private readonly httpService: HttpService) {}

  async getMatches(
    dateFrom: string,
    dateTo: string,
  ): Promise<{ matches: Match[] }> {
    return lastValueFrom(
      this.httpService
        .get<{ matches: Match[] }>(`/v4/matches`, {
          params: {
            dateFrom,
            dateTo,
            permission: 'TIER_THREE',
          },
        })
        .pipe(
          map((r) => r.data),
          catchError((err: AxiosError) => {
            return throwError(
              () => new Error(`Ошибка получения матчей: ${err.message}`),
            );
          }),
        ),
    );
  }

  async getMatchesDataByYear(code: string = 'PL'): Promise<MatchInfoByYear> {
    return firstValueFrom(
      this.httpService.get<Promise<MatchInfoByYear>>(
        `/v4/competitions/${code}/standings`,
        {
          params: {
            season: '2024',
          },
        },
      ),
    )
      .then((r) => r.data)
      .catch((err: AxiosError) => {
        throw new Error(
          `Ошибка получения матчей за текущий сезон: ${err.message}`,
        );
      });
  }
}
