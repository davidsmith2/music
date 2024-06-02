import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Parser } from 'xml2js';

interface Track {
  artist: string;
  album: string;
}

interface Album {
  title: string;
  artist: string;
}

interface Artist {
  name: string;
  albums: Array<Album>;
}

@Injectable()
export class AppService {
  getArtists(): Promise<any> {
    const xml = readFileSync(join(__dirname, 'assets', 'Tracks.xml'), 'utf8');
    const parser = new Parser({
      explicitArray: false,
    });
    return parser.parseStringPromise(xml).then((result) => {
      const tracks: Array<Track> = result.tracks.track;
      const artists: Array<Artist> = this.getArtistsFromTracks(tracks);
      const albums: Array<Album> = this.getAlbumsFromTracks(tracks);
      return artists.map((artist: Artist) => {
        return {...artist, albums: albums.filter((album: Album) => {
          return album.artist === artist.name;
        })};
      });
    });
  }

  getArtistsFromTracks(tracks: Array<Track>): Array<Artist> {
    return tracks.reduce((results: Array<Track>, track: Track) => {
      if (!results.find((result: Track) => {
        return result.artist === track.artist;
      })) {
        results.push(track);
      }
      return results;
    }, []).map((track: Track) => {
      return {
        name: track.artist,
        albums: []
      }
    }).sort((a: Artist, b: Artist) => {
      return a.name.localeCompare(b.name);
    });
  }

  getAlbumsFromTracks(tracks: Array<Track>): Array<Album> {
    return tracks.reduce((results: Array<Track>, track: Track) => {
      if (!results.find((result: Track) => {
        return result.artist === track.artist && result.album === track.album;
      })) {
        results.push(track);
      }
      return results;
    }, []).map((track: Track) => {
      return {
        title: track.album,
        artist: track.artist
      };
    }).sort((a: Album, b: Album) => {
      return a.title.localeCompare(b.title);
    })
  }
}
