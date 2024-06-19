import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Album } from "@davidsmith/api-interfaces";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";

@Injectable({ providedIn: 'root' })
export class AlbumService extends EntityCollectionServiceBase<Album> {
  private readonly storageKey: string = 'artists';
  private readonly apiRoot: string = '/api';

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Album', serviceElementsFactory);
  }

  getAlbums(): Observable<Array<Album>> {
    return this.entities$;
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
