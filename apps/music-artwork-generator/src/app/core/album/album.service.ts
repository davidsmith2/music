import { Observable, catchError, map, of } from "rxjs";
import { Injectable } from "@angular/core";
import { AlbumDto } from "@music/api-interfaces";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { Apollo } from "apollo-angular";
import { SELECT_ALL_ALBUMS, SELECT_ONE_ALBUM, UPDATE_ONE_ALBUM } from "./album.constants";

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
      query: SELECT_ALL_ALBUMS,
    }).valueChanges.pipe(
      map((res) => {
        return res['data']['selectAll_albums'];
      }),
      catchError((err) => {
        return of(null);
      })
    );
  }

  getAlbum(id: string): Observable<AlbumDto> {
    return this.apollo.watchQuery({
      query: SELECT_ONE_ALBUM,
      variables: { _id: id }
    }).valueChanges.pipe(
      map((res) => {
        return res['data']['selectOne_album'];
      }),
      catchError((err) => {
        return of(null);
      })
    );
  }

  updateAlbum(album: Partial<AlbumDto>): Observable<AlbumDto> {
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
