import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { Album } from '@davidsmith/api-interfaces';
import { Artist } from '@davidsmith/api-interfaces';

@Injectable()
export class AlbumService {
  getAlbums() {
    const jsonStr = readFileSync(
      join(__dirname, 'assets', 'Library.json'),
      'utf8'
    );
    const json = JSON.parse(jsonStr);
    return json.artists.reduce((acc: Album[], artist: Artist) => {
      return [...acc, ...artist.albums];
    }, []);
  }

  getAlbum(id: string) {
    const jsonStr = readFileSync(
      join(__dirname, 'assets', 'Library.json'),
      'utf8'
    );
    const json = JSON.parse(jsonStr);
    let album: Album;
    for (let i = 0; i < json.artists.length; i++) {
      const artist = json.artists[i];
      album = artist.albums.find((album: Album) => album.id === id);
      if (album) {
        console.log(album)
        break;
      }
    }
    return album;
  }

  saveAlbum(album: Album) {
    const jsonStr = readFileSync(
      join(__dirname, 'assets', 'Library.json'),
      'utf8'
    );
    const json = JSON.parse(jsonStr);
    const albumToUpdate = json.artists
      .find((artist: Artist) => artist.name === album.artist)
      .albums.find((a: Album) => a.title === album.title);
    albumToUpdate.cover = album.cover;
    writeFileSync(
      join(__dirname, 'assets', 'Library.json'),
      JSON.stringify(json),
      'utf8'
    );
    return album;
  }
}
