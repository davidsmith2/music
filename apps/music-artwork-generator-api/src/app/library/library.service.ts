import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { Album, Artist, Library } from '@davidsmith/api-interfaces';
import * as XXH from 'xxhashjs';

@Injectable()
export class LibraryService {

  private filepath = join(__dirname, 'assets', 'Library.json');

  saveLibrary(library): Library {
    const jsonStr = JSON.stringify({
      id: 1,
      ...this.decorateLibraryWithArtists(library.artists)
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
    return library;
  }

  private decorateLibraryWithArtists(source: Array<Artist>): Partial<Library> {
    const artists: Array<Artist> = source.map(artist => {
      artist.id = this.hash(artist.name);
      return { ...artist, ...this.decorateArtistWithAlbums(artist.albums) };
    });
    const artistIds: Array<string> = artists.map(artist => {
      return artist.id;
    });
    return { artistIds, artists };
  }

  private decorateArtistWithAlbums(source: Array<Album>) {
    const albums: Array<Album> = source.map(album => {
      album.id = this.hash(album.title);
      return album;
    });
    const albumIds: Array<string> = albums.map(album => {
      return album.id;
    });
    return { albumIds, albums };
  }

  private hash(input: string) {
    const seed = 0xABCD;
    const hash = XXH.h32(input, seed).toString(16);
    return hash;
  }

}
