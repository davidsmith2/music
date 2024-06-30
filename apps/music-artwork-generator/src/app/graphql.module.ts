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
            totalSongs: {
              read(_, { readField }) {
                const songs = readField('songs');
                if (Array.isArray(songs)) {
                  return songs.length;
                }
                return 0;
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
