import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Library, LibrarySchema } from './library.schema';
import { LibraryController } from './library.controller';
import { LibraryService } from './library.service';
import { ArtistModule } from '../artist/artist.module';
import { AlbumModule } from '../album/album.module';
import { SongModule } from '../song/song.module';
import { Album, AlbumSchema } from '../album/album.schema';
import { Artist, ArtistSchema } from '../artist/artist.schema';
import { Song, SongSchema } from '../song/song.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Library.name, schema: LibrarySchema },
      { name: Artist.name, schema: ArtistSchema },
      { name: Album.name, schema: AlbumSchema },
      { name: Song.name, schema: SongSchema },
     ])
  ],
  controllers: [LibraryController],
  providers: [LibraryService],
})
export class LibraryModule {}