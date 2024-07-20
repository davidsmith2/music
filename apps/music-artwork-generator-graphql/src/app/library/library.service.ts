import { LibraryDto, LibrarySummaryDto } from "@music/api-interfaces";
import { Injectable } from "@nestjs/common";
import fetch from 'node-fetch';

@Injectable()
export class LibraryService {
  async getLibrarySummary(key: string): Promise<LibrarySummaryDto> {
    const response = await fetch(`http://localhost:3333/api/library/${key}`);
    const data = await response.json() as LibrarySummaryDto;
    return data;
  }
}