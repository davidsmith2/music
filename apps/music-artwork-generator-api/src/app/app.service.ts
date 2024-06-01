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

@Injectable()
export class AppService {
  getArtists(): Promise<Array<Artist>> {
    const xml = readFileSync(join(__dirname, 'assets', 'Tracks.xml'), 'utf8');
    const parser = new Parser({
      explicitArray: false,
    });
    return parser.parseStringPromise(xml).then((result) => {
      const tracks: Array<Track> = result.tracks.track;
      const artists: Array<Artist> = tracks.reduce((results: Array<Track>, track: Track) => {
        if (!results.find((result: Track) => {
          return result.artist === track.artist && result.album === track.album;
        })) {
          results.push(track);
        }
        return results;
      }, []).map((track: Track) => {
        return {name: track.artist};
      }).sort((a: Artist, b: Artist) => a.name.localeCompare(b.name));
      return artists;
    });
  }

  getAlbumsByArtistName(artistName: string): Promise<any> {
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
