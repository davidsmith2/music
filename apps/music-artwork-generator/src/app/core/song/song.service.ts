import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Song } from "@davidsmith/api-interfaces";
import { EntityActionOptions, EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { Observable, catchError, map, of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class SongService extends EntityCollectionServiceBase<Song> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private httpClient: HttpClient
  ) {
    super('Song', serviceElementsFactory);
  }
  getSongs(key: string, options: EntityActionOptions): Observable<Array<Song>> {
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
