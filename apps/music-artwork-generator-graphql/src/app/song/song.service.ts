import { Injectable } from "@nestjs/common";
import fetch from 'node-fetch';
import { SongType } from "./song.types";

@Injectable()
export class SongService {
  async getAll(): Promise<Array<SongType>> {
    const response = await fetch(`http://localhost:3333/api/song`);
    const data = await response.json() as Array<SongType>;
    return data;
  }
}