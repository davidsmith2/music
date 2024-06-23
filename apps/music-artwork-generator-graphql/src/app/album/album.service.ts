import { Injectable } from "@nestjs/common";
import fetch from 'node-fetch';
import { AlbumType } from "./album.types";

@Injectable()
export class AlbumService {
  async getAll(): Promise<Array<AlbumType>> {
    const response = await fetch(`http://localhost:3333/api/album`);
    const data = await response.json() as Array<AlbumType>;
    return data;
  }

  async getByKey(key: string): Promise<AlbumType> {
    const response = await fetch(`http://localhost:3333/api/album/${key}`);
    const data = await response.json() as AlbumType;
    return data;
  }
}