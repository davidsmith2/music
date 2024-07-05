import { Injectable } from '@nestjs/common';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { AlbumDto, ArtistDto, LibraryDto, SongDto } from '@davidsmith/api-interfaces';
import * as XXH from 'xxhashjs';

@Injectable()
export class ImportService {
  private filepath = join(__dirname, 'assets', 'Library.json');

  importSongs(data: Array<SongDto>): LibraryDto {
    const library: LibraryDto = this.createLibrary(data);
    const jsonStr = JSON.stringify(library);
    writeFileSync(this.filepath, jsonStr, 'utf8');
    return library;
  }

  private createLibrary(data: Array<SongDto>): LibraryDto {
    const artists: Array<ArtistDto> = this.createLibraryArtists(data);
    const libraryId: string = `1`;
    const library: LibraryDto = {
      id: libraryId,
      username: null,
      artists
    };
    return library;
  }

  private createLibraryArtists(data: Array<SongDto>): Array<ArtistDto> {
    const artists: Array<ArtistDto> = data.reduce((acc, song, index) => {
      if (!acc.find((artist) => artist.name === song.artist)) {
        const artistId: string = this.createId(song.artist, index);
        const albums: Array<AlbumDto> = this.createArtistAlbums(data, song.artist, index);
        const artist: ArtistDto = {
          id: artistId,
          name: song.artist,
          albums
        };
        acc.push(artist);
      }
      return acc;
    }, []);
    return artists;
  }

  private createArtistAlbums(data: Array<SongDto>, artistName: string, idSeed: number): Array<AlbumDto> {
    const albums: Array<AlbumDto> = data.reduce((acc, song, index) => {
      if (song.artist === artistName && !acc.find((album) => album.title === song.album)) {
        const albumId: string = this.createId(`${song.album}`, idSeed);
        const songs: Array<SongDto> = this.createAlbumSongs(data, artistName, song.album, Number(`${idSeed}${index}`));
        const album: AlbumDto = {
          id: albumId,
          title: song.album,
          artist: artistName,
          songs
        };
        acc.push(album);
      }
      return acc;
    }, []);
    return albums;
  }

  private createAlbumSongs(data: Array<SongDto>, artistName: string, albumName: string, idSeed: number): Array<SongDto> {
    const songs: Array<SongDto> = data.filter((song) => {
      return song.artist === artistName && song.album === albumName;
    }).map((song, index) => {
      const songId: string = this.createId(`${song.title}`, Number(`${idSeed}${index}`));
      const _song: SongDto = {
        id: songId,
        title: song.title,
        artist: song.artist,
        album: song.album,
        genre: song.genre,
        year: song.year,
        duration: song.duration
      };
      return _song;
    });
    return songs;
  }

  private createId(input: string, seed: number): string {
    const hash = XXH.h32(input, seed.toString().padStart(6, '0')).toString(16);
    return hash;
  }

}
