import { Injectable } from '@nestjs/common';
import { LibraryDto, LibrarySummaryDto, SongDto } from '@music/api-interfaces';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Library } from './library.schema';
import { Connection, Model, Schema } from 'mongoose';
import { Song } from '../song/song.schema';

@Injectable()
export class LibraryService {
  constructor(
    @InjectModel(Library.name) private libraryModel: Model<Library>,
    @InjectModel(Song.name) private songModel: Model<Song>,
    @InjectConnection() private connection: Connection
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

  async getLibrarySummary(): Promise<LibrarySummaryDto> {
    const librarySummariesView: Model<any> = this.connection.model('LibrarySummaries', new Schema({}, {strict: false}), 'librarySummariesView');
    const librarySummaries: LibrarySummaryDto[] = await librarySummariesView.find({}).exec().catch(err => console.error(err)) as LibrarySummaryDto[];
    return librarySummaries[0];
  }

}
