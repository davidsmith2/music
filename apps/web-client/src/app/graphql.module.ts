import { NgModule } from '@angular/core';
import {
  ApolloClientOptions,
  InMemoryCache,
  Reference,
  split,
} from '@apollo/client/core';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { Kind, OperationTypeNode } from 'graphql';
import { createClient } from 'graphql-ws';

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const http = httpLink.create({ uri: 'https://local.music.davidsmithweb.com:3000/graphql' });
  const ws = new GraphQLWsLink(
    createClient({
      url: 'wss://local.music.davidsmithweb.com:3000/graphql',
    })
  );
  const link = split(
    ({ query }) => {
      const mainDefinition = getMainDefinition(query);
      return (
        mainDefinition.kind === Kind.OPERATION_DEFINITION &&
        mainDefinition.operation === OperationTypeNode.SUBSCRIPTION
      );
    },
    ws,
    http
  );
  return {
    link,
    cache: new InMemoryCache({
      typePolicies: {
        Artist: {
          fields: {
            totalAlbums: {
              read(_, { readField }) {
                const albums = readField('albums');
                if (Array.isArray(albums)) {
                  return albums.length;
                }
                return 0;
              },
            },
            totalSongs: {
              read(_, { readField }) {
                const albums = readField<Reference[]>('albums');
                if (albums) {
                  return albums.reduce((totalSongs, albumRef) => {
                    const songs = readField<Reference[]>('songs', albumRef);
                    if (Array.isArray(songs)) {
                      return totalSongs + songs.length;
                    }
                    return totalSongs;
                  }, 0);
                }
                return 0;
              },
            },
          },
        },
        Album: {
          fields: {
            genre: {
              read(_, { readField }) {
                const songs = readField<Reference[]>('songs');
                if (songs) {
                  const genres: string[] = songs.map((songRef) =>
                    readField<string>('genre', songRef)
                  );
                  const genre: string = genres[0];
                  return genre;
                }
                return '';
              },
            },
            year: {
              read(_, { readField }) {
                const songs = readField<Reference[]>('songs');
                if (songs) {
                  const years: number[] = songs.map((songRef) =>
                    readField<number>('year', songRef)
                  );
                  const year: number = years[0];
                  return year;
                }
                return null;
              },
            },
            totalSongs: {
              read(_, { readField }) {
                const songs = readField('songs');
                if (Array.isArray(songs)) {
                  return songs.length;
                }
                return 0;
              },
            },
            totalDurationInMinutes: {
              read(_, { readField }) {
                const songs = readField<Reference[]>('songs');
                if (songs) {
                  const rawDuration: number = songs.reduce((acc, songRef) => {
                    const duration = readField<number>('duration', songRef);
                    acc += duration;
                    return acc;
                  }, 0);
                  return Math.floor(rawDuration / 60);
                }
                return 0;
              },
            },
          },
        },
        Song: {
          fields: {
            durationInMinutes: {
              read(_, { readField }) {
                const duration: number = readField<number>('duration');
                const minutes: number = Math.floor(duration / 60);
                const seconds: number = duration % 60;
                return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
              },
            },
          },
        },
      },
    }),
    connectToDevTools: true,
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
