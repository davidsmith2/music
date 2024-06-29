import { Injectable } from "@angular/core";
import { Song } from "@davidsmith/api-interfaces";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { Apollo, gql } from "apollo-angular";
import { Observable, catchError, map, of } from "rxjs";
import { SELECT_ALL_SONGS } from "./song.constants";

@Injectable({ providedIn: 'root' })
export class SongService extends EntityCollectionServiceBase<Song> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private apollo: Apollo
  ) {
    super('Song', serviceElementsFactory);
  }
  getSongs(): Observable<Array<Song>> {
    return this.apollo.query({
      query: SELECT_ALL_SONGS,
    }).pipe(
      map((res) => {
        return res['data']['selectAll_songs'];
      }),
      catchError((err) => {
        return of(null);
      })
    );
  }
}
