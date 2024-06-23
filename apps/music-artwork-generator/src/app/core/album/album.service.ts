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

  /*
  saveAlbumCover(album: Album): Observable<Album> {
    return this.httpClient.put<Album>(`${this.apiRoot}/album`, album);
  }

  updateAlbum(update: Album): void {
    const artists: Array<Artist> = JSON.parse(this.window.localStorage.getItem(this.storageKey)).slice(0);
    const artist: Artist = artists.find((artist) => artist.name === update.artist);
    const albumIndex: number = artist.albums.findIndex(album => album.title === update.title);
    artist.albums.splice(albumIndex, 1, update);
    this.window.localStorage.setItem(this.storageKey, JSON.stringify(artists));
  }
  */

}
