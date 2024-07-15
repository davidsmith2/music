import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Library, LibrarySchema } from './library.schema';
import { LibraryController } from './library.controller';
import { LibraryService } from './library.service';
import { Song, SongSchema } from '../song/song.schema';
import { AppService } from '../app.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Library.name, schema: LibrarySchema },
      { name: Song.name, schema: SongSchema },
     ])
  ],
  controllers: [LibraryController],
  providers: [LibraryService, AppService],
})
export class LibraryModule {}