import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { ArtistDto, LibraryDto } from '@davidsmith/api-interfaces';
import * as XXH from 'xxhashjs';

@Injectable()
export class LibraryService {
  private filepath = join(__dirname, 'assets', 'Library.json');

  saveLibrary(library: LibraryDto): LibraryDto {
    const libraryId: string = this.createId(library.username, 0xABCD);
    library.id = libraryId;
    library.artists = library.artists.map((artist: ArtistDto, artistIndex: number) => {
      const artistId: string = this.createId(artist.name, artistIndex);
      artist.id = artistId;
      artist.albums = artist.albums.map((album, albumIndex) => {
        const albumId: string = this.createId(album.title, Number(`${artist.id}${albumIndex}`));
        album.id = albumId;
        album.songs = album.songs.map((song, songIndex) => {
          const songId: string = this.createId(song.title, Number(`${artist.id}${album.id}${songIndex}`));
          song.duration = Math.round(song.duration) || 0;
          song.id = songId;
          return song;
        });
        return album;
      });
      return artist;
    });
    writeFileSync(this.filepath, JSON.stringify(library), 'utf8');
    return this.getLibrary(library.id);
  }

  getLibrary(id: string): LibraryDto {
    const library: LibraryDto = JSON.parse(readFileSync(this.filepath, 'utf8'));
    return library;
  }

  createId(input, seed): string {
    const hash = XXH.h32(input, seed.toString().padStart(6, '0')).toString(16);
    return hash;
  }
}
