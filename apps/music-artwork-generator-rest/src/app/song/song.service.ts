import { Injectable } from '@nestjs/common';
import { SongDto } from '@davidsmith/api-interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Song } from './song.schema';
import { Model } from 'mongoose';
import { Library } from '../library/library.schema';

@Injectable()
export class SongService {
  constructor(
    @InjectModel(Song.name) private songModel: Model<Song>,
    @InjectModel(Library.name) private libraryModel: Model<Library>
  ) { }

  async createSong(song: SongDto): Promise<SongDto> {
    let createdSong: Song = new this.songModel(song);
    createdSong = await createdSong.save();
    this.libraryModel.updateOne(
      { username: 'test' },
      { $push: { songs: createdSong._id } }
    ).exec();
    return createdSong as SongDto;
  }

  async getSongs(): Promise<Array<SongDto>> {
    const songs: Song[] = await this.songModel.find().exec();
    return songs as SongDto[];
  }
}
