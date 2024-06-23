import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { LibraryResolver } from './library/library.resolver';
import { LibraryService } from './library/library.service';
import { ArtistResolver } from './artist/artist.resolver';
import { ArtistService } from './artist/artist.service';
import { AlbumResolver } from './album/album.resolver';
import { AlbumService } from './album/album.service';
import { SongResolver } from './song/song.resolver';
import { SongService } from './song/song.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      
    })
  ],
  providers: [
    LibraryResolver,
    LibraryService,
    ArtistResolver,
    ArtistService,
    AlbumResolver,
    AlbumService,
    SongResolver,
    SongService
  ]
})
export class AppModule {}