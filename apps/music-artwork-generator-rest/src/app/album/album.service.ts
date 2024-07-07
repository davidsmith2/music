import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { AlbumDto } from '@davidsmith/api-interfaces';
import { ArtistDto } from '@davidsmith/api-interfaces';

@Injectable()
export class AlbumService {
  getAlbums() {
    const jsonStr = readFileSync(
      join(__dirname, 'assets', 'Library.json'),
      'utf8'
    );
    const json = JSON.parse(jsonStr);
    return json.artists.reduce((acc: AlbumDto[], artist: ArtistDto) => {
      return [...acc, ...artist.albums];
    }, []);
  }

  getAlbum(id: string) {
    const jsonStr = readFileSync(
      join(__dirname, 'assets', 'Library.json'),
      'utf8'
    );
    const json = JSON.parse(jsonStr);
    let album: AlbumDto;
    for (let i = 0; i < json.artists.length; i++) {
      const artist = json.artists[i];
      album = artist.albums.find((album: AlbumDto) => album.id === id);
      if (album) {
        break;
      }
    }
    return album;
  }

  updateAlbum(album: AlbumDto) {
    const jsonStr = readFileSync(
      join(__dirname, 'assets', 'Library.json'),
      'utf8'
    );
    const json = JSON.parse(jsonStr);
    let albumToUpdate: AlbumDto;
    for (let i = 0; i < json.artists.length; i++) {
      const artist = json.artists[i];
      albumToUpdate = artist.albums.find((a: AlbumDto) => a.id === album.id);
      if (albumToUpdate) {
        albumToUpdate.cover = album.cover;
        const albumToUpdateIndex = artist.albums.findIndex((a: AlbumDto) => a.id === album.id);
        artist.albums[albumToUpdateIndex] = albumToUpdate;
        break;
      }
    }
    writeFileSync(
      join(__dirname, 'assets', 'Library.json'),
      JSON.stringify(json),
      'utf8'
    );
    return albumToUpdate;
  }
}
