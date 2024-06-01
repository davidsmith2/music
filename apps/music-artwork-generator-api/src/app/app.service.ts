import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Parser } from 'xml2js';

@Injectable()
export class AppService {
  getData(): Promise<any> {
    const xml = readFileSync(join(__dirname, 'assets', 'Tracks.xml'), 'utf8');
    const parser = new Parser({
      explicitArray: false,
    });
    return parser.parseStringPromise(xml).then((result) => {
      const tracks = result.tracks.track;
      const albums = tracks.map((track) => {
        const {artist, album} = track;
        return {artist, album};
      }).reduce((acc, {artist, album}) => {
        if (!acc.find((a) => a.artist === artist && a.album === album)) {
          acc.push({artist, album});
        }
        return acc;
      }, []).sort((a, b) => a.artist.localeCompare(b.artist));
      return albums;
    });
  }
}
