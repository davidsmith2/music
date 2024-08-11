import { ArtistDto } from '@music/api-interfaces';
import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { httpsAgent } from '../app.constants';

@Injectable()
export class ArtistService {
  async getAll(): Promise<ArtistDto[]> {
    const response = await fetch(`https://localhost:3333/api/artist`, {agent: httpsAgent});
    const data = (await response.json()) as ArtistDto[];
    return data;
  }

  async getByKey(key: string): Promise<ArtistDto> {
    const response = await fetch(`https://localhost:3333/api/artist/${key}`, {agent: httpsAgent});
    const data = (await response.json()) as ArtistDto;
    return data;
  }
}
