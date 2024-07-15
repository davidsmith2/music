import { AlbumDto } from "@davidsmith/api-interfaces";
import { Injectable } from "@nestjs/common";
import fetch from 'node-fetch';

@Injectable()
export class AlbumService {
  async getAll(): Promise<Array<AlbumDto>> {
    const response = await fetch(`http://localhost:3333/api/album`);
    const data = await response.json() as Array<AlbumDto>;
    return data;
  }

  async getByKey(key: string): Promise<AlbumDto> {
    const response = await fetch(`http://localhost:3333/api/album/${key}`);
    const data = await response.json() as AlbumDto;
    return data;
  }

  async update(album: AlbumDto): Promise<Partial<AlbumDto>> {
    const response = await fetch(
      `http://localhost:3333/api/album/${album.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(album),
        headers: {'Content-Type': 'application/json'}
      }
    );
    const data = await response.json() as Partial<AlbumDto>;
    return data;
  }
}