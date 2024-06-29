import { Observable, catchError, map, of } from "rxjs";
import { Injectable } from "@angular/core";
import { Album } from "@davidsmith/api-interfaces";
import { EntityActionOptions, EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { Apollo, gql } from "apollo-angular";

@Injectable({ providedIn: 'root' })
export class AlbumService extends EntityCollectionServiceBase<Album> {
  queries = {
    getAlbums: null,
    getAlbum: null,
    updateAlbum: null
  };

  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private apollo: Apollo
  ) {
    super('Album', serviceElementsFactory);
  }

  getAlbums(key: string, options?: EntityActionOptions): Observable<Album[]> {
    this.queries.getAlbums = gql(options.httpOptions.httpParams['query']);
    return this.apollo.query({
      query: this.queries.getAlbums,
    }).pipe(
      map((res) => {
        return res['data'][key];
      }),
      catchError((err) => {
        return of(null);
      })
    );
  }

  getAlbum(key: string, options?: EntityActionOptions): Observable<Album> {
    this.queries.getAlbum = gql(options.httpOptions.httpParams['query']);
    return this.apollo.query({
      query: this.queries.getAlbum,
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
    this.queries.updateAlbum = gql(data.query);
    return this.apollo.mutate({
      mutation: this.queries.updateAlbum,
    }).pipe(
      map((res) => {
        return res['data'][key];
      }),
      catchError((err) => {
        console.error(err);
        return of(null);
      })
    );
  }

}
