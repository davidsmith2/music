import { SongDto } from '@music/api-interfaces';
import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { httpsAgent } from '../app.constants';

@Injectable()
export class SongService {
  async getAll(): Promise<Array<SongDto>> {
    const response = await fetch(`https://localhost:3333/api/song`, {agent: httpsAgent});
    const data = (await response.json()) as Array<SongDto>;
    return data;
  }
}
