import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { LibrarySummaryResolver } from './library-summary/library-summary.resolver';
import { LibrarySummaryService } from './library-summary/library-summary.service';
import { ArtistResolver } from './artist/artist.resolver';
import { ArtistService } from './artist/artist.service';
import { AlbumResolver } from './album/album.resolver';
import { AlbumService } from './album/album.service';
import { SongResolver } from './song/song.resolver';
import { SongService } from './song/song.service';
import { UserResolver } from './user/user.resolver';
import { UserService } from './user/user.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      subscriptions: {
        'graphql-ws': true,
      },
    }),
  ],
  providers: [
    LibrarySummaryResolver,
    LibrarySummaryService,
    ArtistResolver,
    ArtistService,
    AlbumResolver,
    AlbumService,
    SongResolver,
    SongService,
    UserResolver,
    UserService
  ],
})
export class AppModule {}
