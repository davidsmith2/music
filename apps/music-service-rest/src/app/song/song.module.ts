import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SongController } from './song.controller';
import { SongService } from './song.service';
import { Song, SongSchema } from './song.schema';
import { Library, LibrarySchema } from '../library/library.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Song.name, schema: SongSchema },
      { name: Library.name, schema: LibrarySchema },
    ]),
  ],
  controllers: [SongController],
  providers: [SongService],
})
export class SongModule {}
