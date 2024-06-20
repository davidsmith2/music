import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { Album, Artist, Library, Song } from '@davidsmith/api-interfaces';
import * as XXH from 'xxhashjs';

@Injectable()
export class LibraryService {

  private filepath = join(__dirname, 'assets', 'Library.json');

  saveLibrary(library): Library {
    const jsonStr = JSON.stringify({
      id: 1,
      ...this.decorateLibraryArtists(library.artists)
    });
    writeFileSync(
      this.filepath,
      jsonStr,
      'utf8'
    );
    return this.getLibrary(1);
  }

  getLibrary(id: number): Library {
    const jsonStr = readFileSync(
      this.filepath,
      'utf8'
    );
    const library: Library = JSON.parse(jsonStr);
    return {...library, artists: library.artists.map(artist => {
      return {...artist, albums: artist.albums.map(album => {
        delete album.songIds;
        delete album.songs;
        return album;
      })};
    })};
  }

  private decorateLibraryArtists(source: Array<Artist>): Partial<Library> {
    const artists: Array<Artist> = source.map((artist, index) => {
      artist.id = this.hash(artist.name, index);
      return { ...artist, ...this.decorateArtistAlbums(artist.albums, index) };
    });
    const artistIds: Array<string> = artists.map(artist => {
      return artist.id;
    });
    return { artistIds, artists };
  }

  private decorateArtistAlbums(source: Array<Album>, hashSeedPrefix: number) {
    const albums: Array<Album> = source.map((album, index) => {
      const hashSeed: number = Number(`${hashSeedPrefix}${index}`);
      album.id = this.hash(album.title, hashSeed);
      // return {...album, ...this.decorateAlbumSongs(album.songs, hashSeed)};
      return album;
    });
    const albumIds: Array<string> = albums.map(album => {
      return album.id;
    });
    return { albumIds, albums };
  }

  private decorateAlbumSongs(source: Array<Song>, hashSeedPrefix: number) {
    const songs: Array<Song> = source.map((song, index) => {
      const hashSeed: number = Number(`${hashSeedPrefix}${index}`);
      song.id = this.hash(song.title, hashSeed);
      return song;
    });
    const songIds: Array<string> = songs.map(song => {
      return song.id;
    });
    return { songIds, songs };
  }

  private hash(input: string, seed: number) {
    const hash = XXH.h32(input, this.padNumberToSixDigits(seed)).toString(16);
    return hash;
  }

  private padNumberToSixDigits(num: number) {
    return num.toString().padStart(6, '0');
  }

}
