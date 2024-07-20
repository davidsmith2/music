import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { SongModule } from './song/song.module';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { LibraryModule } from './library/library.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/music'),
    LibraryModule,
    ArtistModule,
    AlbumModule,
    SongModule
  ],
  controllers: [
    AppController
  ],
})
export class AppModule {}
