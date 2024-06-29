import { Observable, catchError, map, of } from "rxjs";
import { Injectable } from "@angular/core";
import { Album } from "@davidsmith/api-interfaces";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { Apollo } from "apollo-angular";
import { SELECT_ALL_ALBUMS, SELECT_ONE_ALBUM, UPDATE_ONE_ALBUM } from "./album.constants";

@Injectable({ providedIn: 'root' })
export class AlbumService extends EntityCollectionServiceBase<Album> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private apollo: Apollo
  ) {
    super('Album', serviceElementsFactory);
  }

  getAlbums(): Observable<Album[]> {
    return this.apollo.query({
      query: SELECT_ALL_ALBUMS,
    }).pipe(
      map((res) => {
        return res['data']['selectAll_albums'];
      }),
      catchError((err) => {
        return of(null);
      })
    );
  }

  getAlbum(id: string): Observable<Album> {
    return this.apollo.query({
      query: SELECT_ONE_ALBUM,
      variables: { id }
    }).pipe(
      map((res) => {
        return res['data']['selectOne_album'];
      }),
      catchError((err) => {
        return of(null);
      })
    );
  }

  updateAlbum(album: Partial<Album>): Observable<Album> {
    return this.apollo.mutate({
      mutation: UPDATE_ONE_ALBUM,
      variables: { album }
    }).pipe(
      map((res) => {
        return res['data']['updateOne_album'];
      }),
      catchError((err) => {
        console.error(err);
        return of(null);
      })
    );
  }

}
