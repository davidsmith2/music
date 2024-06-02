import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Parser } from 'xml2js';

interface Track {
  artist: string;
  album: string;
}

interface Artist {
  name: string;
}

interface Album {
  title: string;
  artist: string;
}

@Injectable()
export class AppService {
  getAlbums(): Promise<any> {
    const xml = readFileSync(join(__dirname, 'assets', 'Tracks.xml'), 'utf8');
    const parser = new Parser({
      explicitArray: false,
    });
    return parser.parseStringPromise(xml).then((result) => {
      const tracks: Array<Track> = result.tracks.track;
      const albums: Array<Album> = tracks.reduce((results: Array<Track>, track: Track) => {
        if (!results.find((result: Track) => result.album === track.album)) {
          results.push(track);
        }
        return results;
      }, []).map((track: Track) => {
        return {
          title: track.album,
          artist: track.artist
        }
      }).sort((a: Album, b: Album) => a.title.localeCompare(b.title));
      return albums;
    });
  }
}
