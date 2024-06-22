import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Artist } from '@davidsmith/api-interfaces';
import { Album } from '@davidsmith/api-interfaces';

@Injectable()
export class ArtistService {
  getArtists(): Promise<Array<Artist>> {
    const jsonStr = readFileSync(
      join(__dirname, 'assets', 'Library.json'),
      'utf8'
    );
    const json = JSON.parse(jsonStr);
    return json.artists;
  }
}
