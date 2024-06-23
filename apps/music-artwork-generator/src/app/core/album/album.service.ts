import { Observable, catchError, map, of } from "rxjs";
import { Injectable } from "@angular/core";
import { Album } from "@davidsmith/api-interfaces";
import { EntityActionOptions, EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class AlbumService extends EntityCollectionServiceBase<Album> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private httpClient: HttpClient
  ) {
    super('Album', serviceElementsFactory);
  }

  getAlbums(key: string, options?: EntityActionOptions): Observable<Album[]> {
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

  updateAlbum(key: string, data: any, options: EntityActionOptions): Observable<Album> {
    return this.httpClient.post<Album>(`/graphql`, data, {
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
