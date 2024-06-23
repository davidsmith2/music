import { Injectable } from "@nestjs/common";
import { ArtistType } from "./artist.types";
import fetch from 'node-fetch';

@Injectable()
export class ArtistService {
  async getByKey(key: string): Promise<ArtistType> {
    const response = await fetch(`http://localhost:3333/api/artist/${key}`);
    const data = await response.json() as ArtistType;
    return data;
  }
}