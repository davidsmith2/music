import { Injectable } from "@angular/core";
import { Song } from "@davidsmith/api-interfaces";
import { EntityActionOptions, EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { Apollo, gql } from "apollo-angular";
import { Observable, catchError, map, of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class SongService extends EntityCollectionServiceBase<Song> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private apollo: Apollo
  ) {
    super('Song', serviceElementsFactory);
  }
  getSongs(key: string, options: EntityActionOptions): Observable<Array<Song>> {
    return this.apollo.query({
      query: gql(options.httpOptions.httpParams['query']),
    }).pipe(
      map((res) => {
        return res['data'][key];
      }),
      catchError((err) => {
        return of(null);
      })
    );
  }
}
