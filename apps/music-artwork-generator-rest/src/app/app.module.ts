import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LibraryController } from './library/library.controller';
import { ArtistController } from './artist/artist.controller';
import { AlbumController } from './album/album.controller';
import { LibraryService } from './library/library.service';
import { ArtistService } from './artist/artist.service';
import { AlbumService } from './album/album.service';
import { SongController } from './song/song.controller';
import { SongService } from './song/song.service';
import { ImportController } from './import/import.controller';
import { ImportService } from './import/import.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    LibraryController,
    ArtistController,
    AlbumController,
    SongController,
    ImportController
  ],
  providers: [
    LibraryService,
    ArtistService,
    AlbumService,
    SongService,
    ImportService
  ],
})
export class AppModule {}
