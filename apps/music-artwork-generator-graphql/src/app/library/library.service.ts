import { Injectable } from "@nestjs/common";
import { LibraryType } from "./library.types";
import fetch from 'node-fetch';

@Injectable()
export class LibraryService {
  async getByKey(key: string): Promise<LibraryType> {
    const response = await fetch(`http://localhost:3333/api/library/${key}`);
    const data = await response.json() as LibraryType;
    return data;
  }
}