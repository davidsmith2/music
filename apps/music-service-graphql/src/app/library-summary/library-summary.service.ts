import { LibrarySummaryDto } from '@music/api-interfaces';
import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { httpsAgent } from '../app.constants';

@Injectable()
export class LibrarySummaryService {
  async getLibrarySummary(username: string): Promise<LibrarySummaryDto> {
    const response = await fetch(
      `https://localhost:3333/api/library-summary/?username=${username}`,
      { agent: httpsAgent }
    );
    const data = (await response.json()) as LibrarySummaryDto;
    return data;
  }
}
