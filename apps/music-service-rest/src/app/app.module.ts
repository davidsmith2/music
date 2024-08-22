import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SongModule } from './song/song.module';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { LibraryModule } from './library/library.module';
import { LibrarySummaryModule } from './library-summary/library-summary.module';
import { StatusController } from './status/status.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/music'),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.cwd() + '/apps/music-service-rest/.env',
    }),
    LibraryModule,
    ArtistModule,
    AlbumModule,
    SongModule,
    LibrarySummaryModule,
    AuthModule,
    UserModule
  ],
  controllers: [StatusController],
})
export class AppModule {}
