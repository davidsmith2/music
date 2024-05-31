import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { Parser } from 'xml2js';

@Injectable()
export class AppService {
  getData(): Promise<any> {
    const xml = readFileSync(join(__dirname, 'assets', 'Library.xml'), 'utf8');
    const parser = new Parser();
    return parser.parseStringPromise(xml).then((result) => {
      const tracks = result.plist.dict[0].dict[0].dict;
      const albums = tracks.map((track) => {
        const [, artist, , album] = track.string;
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
