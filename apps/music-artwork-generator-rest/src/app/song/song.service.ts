import { Injectable } from '@nestjs/common';
import { SongDto } from '@davidsmith/api-interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Song } from './song.schema';
import { Model } from 'mongoose';

@Injectable()
export class SongService {
  constructor(@InjectModel(Song.name) private songModel: Model<Song>) { }

  async createSong(song: SongDto): Promise<SongDto> {
    const createdSong: Song = new this.songModel(song);
    createdSong.save();
    return song;
  }

  async getSongs(): Promise<Array<SongDto>> {
    const songs: Song[] = await this.songModel.find().exec();
    return songs.map((song) => {
      return {
        id: song._id as string,
        title: song.title,
        genre: song.genre,
        year: song.year,
        duration: song.duration
      } as SongDto;
    });
  }
}
