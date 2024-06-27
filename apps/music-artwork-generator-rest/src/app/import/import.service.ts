import { Injectable } from '@nestjs/common';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { Album, Artist, Library, Song } from '@davidsmith/api-interfaces';
import * as XXH from 'xxhashjs';

@Injectable()
export class ImportService {
  private filepath = join(__dirname, 'assets', 'Library.json');

  importSongs(data: Array<Song>): Library {
    const library: Library = this.createLibrary(data);
    const jsonStr = JSON.stringify(library);
    writeFileSync(this.filepath, jsonStr, 'utf8');
    return library;
  }

  private createLibrary(data: Array<Song>): Library {
    const artists: Array<Artist> = this.createLibraryArtists(data);
    const libraryId: string = `1`;
    const library: Library = {
      id: libraryId,
      username: null,
      artistIds: artists.map((artist) => artist.id),
      artists
    };
    return library;
  }

  private createLibraryArtists(data: Array<Song>): Array<Artist> {
    const artists: Array<Artist> = data.reduce((acc, song, index) => {
      if (!acc.find((artist) => artist.name === song.artist)) {
        const artistId: string = this.createId(song.artist, index);
        const albums: Array<Album> = this.createArtistAlbums(data, song.artist, index);
        const artist: Artist = {
          id: artistId,
          name: song.artist,
          albumIds: albums.map((album) => album.id),
          albums
        };
        acc.push(artist);
      }
      return acc;
    }, []);
    return artists;
  }

  private createArtistAlbums(data: Array<Song>, artistName: string, idSeed: number): Array<Album> {
    const albums: Array<Album> = data.reduce((acc, song, index) => {
      if (song.artist === artistName && !acc.find((album) => album.title === song.album)) {
        const albumId: string = this.createId(`${song.album}`, idSeed);
        const songs: Array<Song> = this.createAlbumSongs(data, artistName, song.album, Number(`${idSeed}${index}`));
        const album: Album = {
          id: albumId,
          title: song.album,
          artist: artistName,
          songIds: songs.map((song) => song.id),
          songs
        };
        acc.push(album);
      }
      return acc;
    }, []);
    return albums;
  }

  private createAlbumSongs(data: Array<Song>, artistName: string, albumName: string, idSeed: number): Array<Song> {
    const songs: Array<Song> = data.filter((song) => {
      return song.artist === artistName && song.album === albumName;
    }).map((song, index) => {
      const songId: string = this.createId(`${song.title}`, Number(`${idSeed}${index}`));
      const _song: Song = {
        id: songId,
        title: song.title,
        artist: song.artist,
        album: song.album
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
