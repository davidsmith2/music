import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { Artist, Library } from '@davidsmith/api-interfaces';
import * as XXH from 'xxhashjs';

@Injectable()
export class LibraryService {
  private filepath = join(__dirname, 'assets', 'Library.json');

  saveLibrary(library: Library): Library {
    const libraryId: string = this.createId(library.username, 0xABCD);
    library.id = libraryId;
    library.artists = library.artists.map((artist: Artist, artistIndex: number) => {
      const artistId: string = this.createId(artist.name, artistIndex);
      artist.id = artistId;
      artist.albums = artist.albums.map((album, albumIndex) => {
        const albumId: string = this.createId(album.title, Number(`${artist.id}${albumIndex}`));
        album.id = albumId;
        album.songs = album.songs.map((song, songIndex) => {
          const songId: string = this.createId(song.title, Number(`${artist.id}${album.id}${songIndex}`));
          song.id = songId;
          return song;
        });
        album.songIds = album.songs.map((song) => song.id);
        return album;
      });
      artist.albumIds = artist.albums.map((album) => album.id);
      return artist;
    });
    library.artistIds = library.artists.map((artist: Artist) => artist.id);
    writeFileSync(this.filepath, JSON.stringify(library), 'utf8');
    return this.getLibrary(library.id);
  }

  getLibrary(id: string): Library {
    const library: Library = JSON.parse(readFileSync(this.filepath, 'utf8'));
    return library;
  }

  createId(input, seed): string {
    const hash = XXH.h32(input, seed.toString().padStart(6, '0')).toString(16);
    return hash;
  }
}
