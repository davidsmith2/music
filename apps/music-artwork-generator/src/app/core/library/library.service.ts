import { Injectable } from "@angular/core";
import { Library } from "@davidsmith/api-interfaces";
import { EntityActionOptions, EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { Apollo, gql } from "apollo-angular";
import { Observable, catchError, map, of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class LibraryService extends EntityCollectionServiceBase<Library> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private apollo: Apollo
  ) {
    super('Library', serviceElementsFactory);
  }

  getLibrary(key: string, options: EntityActionOptions): Observable<Library> {
    return this.apollo.query({
      query: gql(options.httpOptions.httpParams['query'])
    }).pipe(
      map(result => {
        return result.data[key];
      }),
      catchError((err) => {
        console.error(err);
        return of(null);
      })
    );
  }
}
