import { LibraryDto } from "@davidsmith/api-interfaces";
import { Injectable } from "@nestjs/common";
import fetch from 'node-fetch';

@Injectable()
export class LibraryService {
  async getByKey(key: string): Promise<LibraryDto> {
    const response = await fetch(`http://localhost:3333/api/library/${key}`);
    const data = await response.json() as LibraryDto;
    return data;
  }
}