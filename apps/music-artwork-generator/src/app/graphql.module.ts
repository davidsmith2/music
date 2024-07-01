import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache, Reference } from '@apollo/client/core';

const uri = '/graphql';

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({ uri }),
    cache: new InMemoryCache({
      typePolicies: {
        ArtistType: {
          fields: {
            totalAlbums: {
              read(_, { readField }) {
                const albums = readField('albums');
                if (Array.isArray(albums)) {
                  return albums.length;
                }
                return 0;
              }
            },
            totalSongs: {
              read(_, { readField }) {
                const albums = readField<Reference[]>('albums');
                if (albums) {
                  return albums.reduce((totalSongs, albumRef) => {
                    const songs = readField<Reference[]>("songs", albumRef);
                    if (Array.isArray(songs)) {
                      return totalSongs + songs.length;
                    }
                    return totalSongs;
                  }, 0);
                }
                return 0;
              }
            }
          }
        },
        AlbumType: {
          fields: {
            genre: {
              read(_, { readField }) {
                const songs = readField<Reference[]>('songs');
                if (songs) {
                  const genres: string[] = songs.map((songRef) => readField<string>("genre", songRef));
                  const genre: string = genres[0];
                  return genre;
                }
                return '';
              }
            },
            year: {
              read(_, { readField }) {
                const songs = readField<Reference[]>('songs');
                if (songs) {
                  const years: number[] = songs.map((songRef) => readField<number>("year", songRef));
                  const year: number = years[0];
                  return year;
                }
                return null;
              }
            },
            totalSongs: {
              read(_, { readField }) {
                const songs = readField('songs');
                if (Array.isArray(songs)) {
                  return songs.length;
                }
                return 0;
              }
            },
            totalDurationInMinutes: {
              read(_, { readField }) {
                const songs = readField<Reference[]>('songs');
                if (songs) {
                  const rawDuration: number = songs.reduce((acc, songRef) => {
                    const duration = readField<number>("duration", songRef);
                    acc += duration;
                    return acc;
                  }, 0);
                  return Math.floor(rawDuration / 60);
                }
                return 0;
              }
            }
          }
        },
        SongType: {
          fields: {
            durationInMinutes: {
              read(_, { readField }) {
                const duration: number = readField<number>('duration');
                const minutes: number = Math.floor(duration / 60);
                const seconds: number = duration % 60;
                return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
              }
            }
          }
        }
      }
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
