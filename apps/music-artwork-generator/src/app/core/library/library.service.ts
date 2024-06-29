import { Injectable } from "@angular/core";
import { Library } from "@davidsmith/api-interfaces";
import { EntityActionOptions, EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { Apollo, gql } from "apollo-angular";
import { Observable, catchError, map, of } from "rxjs";
import { SELECT_ONE_LIBRARY } from "./library.constants";

@Injectable({ providedIn: 'root' })
export class LibraryService extends EntityCollectionServiceBase<Library> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private apollo: Apollo
  ) {
    super('Library', serviceElementsFactory);
  }

  getLibrary(): Observable<Library> {
    return this.apollo.query({
      query: SELECT_ONE_LIBRARY,
    }).pipe(
      map(result => {
        return result.data['selectOne_library'];
      }),
      catchError((err) => {
        console.error(err);
        return of(null);
      })
    );
  }
}
