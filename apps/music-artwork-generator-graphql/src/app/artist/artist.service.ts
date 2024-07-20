import { ArtistDto } from "@music/api-interfaces";
import { Injectable } from "@nestjs/common";
import fetch from 'node-fetch';

@Injectable()
export class ArtistService {
  async getAll(): Promise<ArtistDto[]> {
    const response = await fetch(`http://localhost:3333/api/artist`);
    const data = await response.json() as ArtistDto[];
    return data;
  }

  async getByKey(key: string): Promise<ArtistDto> {
    const response = await fetch(`http://localhost:3333/api/artist/${key}`);
    const data = await response.json() as ArtistDto;
    return data;
  }
}