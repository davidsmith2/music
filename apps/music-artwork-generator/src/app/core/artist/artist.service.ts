import { Injectable } from "@angular/core";
import { Artist } from "@davidsmith/api-interfaces";
import { EntityActionOptions, EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { Apollo, gql } from "apollo-angular";
import { Observable, catchError, map, of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ArtistService extends EntityCollectionServiceBase<Artist> {
  queries = {
    getArtist: null
  }

  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private apollo: Apollo
  ) {
    super('Artist', serviceElementsFactory);
  }

  getArtist(key: string, options: EntityActionOptions): Observable<Artist> {
    this.queries.getArtist = gql(options.httpOptions.httpParams['query']);
    return this.apollo.query({
      query: this.queries.getArtist,
    }).pipe(
      map(result => {
        return result.data[key];
      }),
      catchError(err => {
        console.error(err);
        return of(null);
      })
    );
  }

}
