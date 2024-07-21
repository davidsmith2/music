import { Injectable } from "@angular/core";
import { LibraryDto, LibrarySummaryDto } from "@music/api-interfaces";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { Apollo } from "apollo-angular";
import { Observable, catchError, map, of } from "rxjs";
import { SELECT_ONE_LIBRARY_SUMMARY } from "./library.constants";

@Injectable({ providedIn: 'root' })
export class LibraryService extends EntityCollectionServiceBase<LibraryDto> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private apollo: Apollo
  ) {
    super('Library', serviceElementsFactory);
  }

  getLibrary(username: string): Observable<LibrarySummaryDto> {
    return this.apollo.watchQuery({
      query: SELECT_ONE_LIBRARY_SUMMARY,
      variables: { username }
    }).valueChanges.pipe(
      map(result => {
        return result.data['selectOne_librarySummary'];
      }),
      catchError((err) => {
        console.error(err);
        return of(null);
      })
    );
  }
}
