import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Library, Song } from '@davidsmith/api-interfaces';

@Injectable()
export class SongService {
  private filepath = join(__dirname, 'assets', 'Library.json');
  
  getSongs(): Array<Song> {
    const jsonStr = readFileSync(this.filepath, 'utf8');
    const library: Library = JSON.parse(jsonStr);
    return library.artists.reduce((songs, artist) => {
      artist.albums.forEach((album) => {
        album.songs.forEach((song) => {
          songs.push(song);
        });
      });
      return songs;
    }, []);
  }
}
