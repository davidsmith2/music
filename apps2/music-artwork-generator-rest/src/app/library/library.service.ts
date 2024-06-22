import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { Album, Artist, Library, Song } from '@davidsmith/api-interfaces';

@Injectable()
export class LibraryService {
  private filepath = join(__dirname, 'assets', 'Library.json');

  saveLibrary(library): Library {
    const jsonStr = JSON.stringify({
      id: 1,
      ...library,
    });
    writeFileSync(this.filepath, jsonStr, 'utf8');
    return this.getLibrary(1);
  }

  getLibrary(id: number): Library {
    const jsonStr = readFileSync(this.filepath, 'utf8');
    const library: Library = JSON.parse(jsonStr);
    return {
      ...library,
      artists: library.artists.map((artist) => {
        return {
          ...artist,
          albums: artist.albums.map((album) => {
            delete album.songIds;
            delete album.songs;
            return album;
          }),
        };
      }),
    };
  }
}
