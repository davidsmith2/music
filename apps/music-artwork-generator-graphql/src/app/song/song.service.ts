import { SongDto } from "@music/api-interfaces";
import { Injectable } from "@nestjs/common";
import fetch from 'node-fetch';

@Injectable()
export class SongService {
  async getAll(): Promise<Array<SongDto>> {
    const response = await fetch(`http://localhost:3333/api/song`);
    const data = await response.json() as Array<SongDto>;
    return data;
  }
}