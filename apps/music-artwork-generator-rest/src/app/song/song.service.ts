import { Injectable } from '@nestjs/common';
import { SongDto } from '@davidsmith/api-interfaces';
import { AppService } from '../app.service';
import { InjectModel } from '@nestjs/mongoose';
import { Song } from './song.schema';
import { Model } from 'mongoose';

@Injectable()
export class SongService extends AppService {
  constructor(@InjectModel(Song.name) private songModel: Model<Song>) {
    super();
  }

  async createSong(song: SongDto): Promise<SongDto> {
    const createdSong: Song = new this.songModel(song);
    createdSong.save();
    return song;
  }

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
