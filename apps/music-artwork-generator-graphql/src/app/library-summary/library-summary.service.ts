import { LibrarySummaryDto } from "@music/api-interfaces";
import { Injectable } from "@nestjs/common";
import fetch from 'node-fetch';

@Injectable()
export class LibrarySummaryService {
  async getLibrarySummary(username: string): Promise<LibrarySummaryDto> {
    const response = await fetch(`http://localhost:3333/api/library-summary/?username=${username}`);
    const data = await response.json() as LibrarySummaryDto;
    return data;
  }
}