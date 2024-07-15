import { Injectable } from '@nestjs/common';
import { CreateLibraryDto, LibraryDto, SongDto } from '@davidsmith/api-interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Library } from './library.schema';
import { Model } from 'mongoose';
import { Song } from '../song/song.schema';
import { AppService } from '../app.service';

@Injectable()
export class LibraryService {
  constructor(
    @InjectModel(Library.name) private libraryModel: Model<Library>,
    @InjectModel(Song.name) private songModel: Model<Song>,
    private appService: AppService
  ) { }

  async saveLibrary(createLibraryDto: CreateLibraryDto): Promise<LibraryDto> {
    // Step 1: Save songs
    const songIds = await Promise.all(createLibraryDto.songs.map(async (songDto: SongDto) => {
      const song = new this.songModel(songDto);
      const savedSong = await song.save();
      return savedSong._id;
    }));
    // Step 2: Save library
    const library = new this.libraryModel({
      username: createLibraryDto.username,
      songs: songIds,
    });
    await library.save();
    // Step 3: Return the saved Library document (or its DTO)
    return this.getLibrary();
  }

  async getLibrary(): Promise<LibraryDto> {
    const library: Library = await this.libraryModel.findOne({username: 'test'}).populate('songs').exec();
    return {
      id: library._id as string,
      username: library.username,
      artists: this.appService.getArtistDtos(library.songs)
    };
  }

}
