import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { LibraryController } from './library/library.controller';
import { ArtistController } from './artist/artist.controller';
import { AlbumController } from './album/album.controller';
import { LibraryService } from './library/library.service';
import { ArtistService } from './artist/artist.service';
import { AlbumService } from './album/album.service';
import { ImportController } from './import/import.controller';
import { ImportService } from './import/import.service';
import { SongModule } from './song/song.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/music'),
    SongModule
  ],
  controllers: [
    AppController,
    LibraryController,
    ArtistController,
    AlbumController,
    ImportController
  ],
  providers: [
    LibraryService,
    ArtistService,
    AlbumService,
    ImportService
  ],
})
export class AppModule {}
