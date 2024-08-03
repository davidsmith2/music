import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { Library, LibrarySchema } from '../library/library.schema';
import { Song, SongSchema } from '../song/song.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Library.name, schema: LibrarySchema },
      { name: Song.name, schema: SongSchema },
    ]),
  ],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
