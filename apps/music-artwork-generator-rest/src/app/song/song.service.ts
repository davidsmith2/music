import { Injectable } from '@nestjs/common';
import { SongDto } from '@davidsmith/api-interfaces';
import { AppService } from '../app.service';

@Injectable()
export class SongService extends AppService {
  getSongs(): Array<SongDto> {
    return this.readLibrary().artists.reduce((songs, artist) => {
      artist.albums.forEach((album) => {
        album.songs.forEach((song) => {
          songs.push(song);
        });
      });
      return songs;
    }, []);
  }
}
