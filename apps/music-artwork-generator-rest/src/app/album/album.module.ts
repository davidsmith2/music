import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Album, AlbumSchema } from './album.schema';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { Song, SongSchema } from '../song/song.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Album.name, schema: AlbumSchema },
      { name: Song.name, schema: SongSchema }
    ])
  ],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}