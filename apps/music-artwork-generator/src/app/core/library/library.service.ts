import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Library } from "@davidsmith/api-interfaces";
import { EntityActionOptions, EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { Observable, catchError, map, of, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class LibraryService extends EntityCollectionServiceBase<Library> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private httpClient: HttpClient
  ) {
    super('Library', serviceElementsFactory);
  }

  getLibrary(key: string, options: EntityActionOptions): Observable<Library> {
    return this.httpClient.get(`/graphql`, {
      params: options.httpOptions.httpParams as any,
      headers: options.httpOptions.httpHeaders as any
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
