import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { ArtistDto } from '@davidsmith/api-interfaces';

@Injectable()
export class ArtistService {
  getArtists(): Promise<Array<ArtistDto>> {
    const jsonStr = readFileSync(
      join(__dirname, 'assets', 'Library.json'),
      'utf8'
    );
    const json = JSON.parse(jsonStr);
    return json.artists;
  }

  getArtist(id: string): Promise<ArtistDto> {
    const jsonStr = readFileSync(
      join(__dirname, 'assets', 'Library.json'),
      'utf8'
    );
    const json = JSON.parse(jsonStr);
    return json.artists.find((artist: ArtistDto) => artist.id === id);
  }
}
