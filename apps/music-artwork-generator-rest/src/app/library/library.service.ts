import { Injectable } from '@nestjs/common';
import { ArtistDto, LibraryDto, SongDto } from '@davidsmith/api-interfaces';
import * as XXH from 'xxhashjs';
import { AppService } from '../app.service';

@Injectable()
export class LibraryService extends AppService {
  saveLibrary(library: LibraryDto): LibraryDto {
    const libraryId: string = this.createId(library.username, 0xABCD);
    library.id = libraryId;
    library.artists = library.artists.map((artist: ArtistDto, artistIndex: number) => {
      const artistId: string = this.createId(artist.name, artistIndex);
      artist.id = artistId;
      artist.albums = artist.albums.map((album, albumIndex) => {
        const albumId: string = this.createId(album.title, Number(`${artist.id}${albumIndex}`));
        album.id = albumId;
        album.songs = album.songs.filter((song: SongDto, songIndex: number) => {
          if (!song) {
            console.log('Error reading song', album.title, songIndex + 1);
          }
          return !!song;
        }).map((song, songIndex) => {
          const songId: string = this.createId(song.title, Number(`${artist.id}${album.id}${songIndex}`));
          song.duration = Math.round(song.duration) || 0;
          song.id = songId;
          return song;
        });
        return album;
      });
      return artist;
    });
    this.writeLibrary(library);
    return this.getLibrary();
  }

  getLibrary(): LibraryDto {
    return this.readLibrary();
  }

  private createId(input, seed): string {
    const hash = XXH.h32(input, seed.toString().padStart(6, '0')).toString(16);
    return hash;
  }
}
