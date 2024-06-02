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
      }, []).reduce((results: Array<Track>, track: Track) => {
        if (!results.find((result: Track) => result.artist === track.artist)) {
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
      const tracks: Array<Track> = result.tracks.track;
      const albums: Array<Album> = tracks.filter((track: Track) => {
        return track.artist === artistName;
      }).reduce((results: Array<Track>, track: Track) => {
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
