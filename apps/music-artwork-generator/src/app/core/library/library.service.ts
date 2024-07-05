import { Injectable } from "@angular/core";
import { LibraryDto } from "@davidsmith/api-interfaces";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { Apollo } from "apollo-angular";
import { Observable, catchError, map, of } from "rxjs";
import { SELECT_ONE_LIBRARY } from "./library.constants";

@Injectable({ providedIn: 'root' })
export class LibraryService extends EntityCollectionServiceBase<LibraryDto> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private apollo: Apollo
  ) {
    super('Library', serviceElementsFactory);
  }

  getLibrary(id: string): Observable<LibraryDto> {
    return this.apollo.watchQuery({
      query: SELECT_ONE_LIBRARY,
      variables: { id }
    }).valueChanges.pipe(
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
