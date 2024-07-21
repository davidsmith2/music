import { Injectable } from '@nestjs/common';
import { LibraryDto, SongDto } from '@music/api-interfaces';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Library } from './library.schema';
import { Connection, Model } from 'mongoose';
import { Song } from '../song/song.schema';

@Injectable()
export class LibraryService {
  constructor(
    @InjectModel(Library.name) private libraryModel: Model<Library>,
    @InjectModel(Song.name) private songModel: Model<Song>
  ) { }

  async saveLibrary(libraryDto: LibraryDto): Promise<LibraryDto> {
    // Step 1: Save songs
    const songIds = await Promise.all(libraryDto.songs.map(async (songDto: SongDto) => {
      const song = new this.songModel(songDto);
      const savedSong = await song.save();
      return savedSong._id;
    }));
    // Step 2: Save library
    const library = new this.libraryModel({
      username: libraryDto.username,
      songs: songIds,
    });
    await library.save();
    // Step 3: Return the saved Library document (or its DTO)
    return libraryDto;
  }

}
