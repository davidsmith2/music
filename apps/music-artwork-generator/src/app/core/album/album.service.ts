import { Observable, catchError, map, of } from "rxjs";
import { Injectable } from "@angular/core";
import { AlbumDto } from "@music/api-interfaces";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { Apollo } from "apollo-angular";
import { GET_ALBUMS, GET_ALBUM, UPDATE_ALBUM } from "./album.constants";

@Injectable({ providedIn: 'root' })
export class AlbumService extends EntityCollectionServiceBase<AlbumDto> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private apollo: Apollo
  ) {
    super('Album', serviceElementsFactory);
  }

  getAlbums(): Observable<AlbumDto[]> {
    return this.apollo.watchQuery({
      query: GET_ALBUMS,
    }).valueChanges.pipe(
      map((res) => {
        return res['data']['getAlbums'];
      }),
      catchError((err) => {
        return of(null);
      })
    );
  }

  getAlbum(id: string): Observable<AlbumDto> {
    return this.apollo.watchQuery({
      query: GET_ALBUM,
      variables: { _id: id }
    }).valueChanges.pipe(
      map((res) => {
        return res['data']['getAlbum'];
      }),
      catchError((err) => {
        return of(null);
      })
    );
  }

  updateAlbum(album: Partial<AlbumDto>): Observable<AlbumDto> {
    return this.apollo.mutate({
      mutation: UPDATE_ALBUM,
      variables: { album }
    }).pipe(
      map((res) => {
        return res['data']['updateAlbum'];
      }),
      catchError((err) => {
        console.error(err);
        return of(null);
      })
    );
  }

}
