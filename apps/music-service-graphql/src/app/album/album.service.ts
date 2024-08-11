import { AlbumDto } from '@music/api-interfaces';
import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { httpsAgent } from '../app.constants';

@Injectable()
export class AlbumService {
  async getAll(): Promise<Array<AlbumDto>> {
    const response = await fetch(`https://localhost:3333/api/album`, {agent: httpsAgent});
    const data = (await response.json()) as Array<AlbumDto>;
    return data;
  }

  async getByKey(key: string): Promise<AlbumDto> {
    const response = await fetch(`https://localhost:3333/api/album/${key}`, {agent: httpsAgent});
    const data = (await response.json()) as AlbumDto;
    return data;
  }

  async update(album: AlbumDto): Promise<Partial<AlbumDto>> {
    const response = await fetch(
      `https://localhost:3333/api/album/${album._id}`,
      {
        method: 'PUT',
        body: JSON.stringify(album),
        headers: { 'Content-Type': 'application/json' },
        agent: httpsAgent
      }
    );
    const data = (await response.json()) as Partial<AlbumDto>;
    return data;
  }
}
