import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Artist, ArtistSchema } from './artist.schema';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { Album, AlbumSchema } from '../album/album.schema';
import { Song, SongSchema } from '../song/song.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Artist.name, schema: ArtistSchema },
      { name: Album.name, schema: AlbumSchema },
      { name: Song.name, schema: SongSchema }
    ])
  ],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}