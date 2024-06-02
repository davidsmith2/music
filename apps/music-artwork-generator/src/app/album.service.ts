import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, iif, of } from "rxjs";
import { Album } from "./album.interface";
import { Inject, Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { WINDOW } from "./window.constant";

@Injectable({ providedIn: 'root' })
export class AlbumService {
  constructor(
    private httpClient: HttpClient,
    @Inject(WINDOW) private window: Window
  ) {}

  getAlbumsByArtistName(artistName: string): Observable<Album[]> {
    const storageKey: string = `albums-${encodeURIComponent(artistName)}`;
    return iif(
      () => this.window.localStorage.getItem(storageKey) !== null,
      of(JSON.parse(this.window.localStorage.getItem(storageKey))),
      this.httpClient.get<Album[]>('/api/album', {
        params: {
          artistName
        }
      }).pipe(
        tap((albums: Array<Album>) => {
          this.window.localStorage.setItem(storageKey, JSON.stringify(albums));
        })
      )
    );
  }

  updateAlbum(albumToUpdate: Album): void {
    const storageKey: string = `albums-${encodeURIComponent(albumToUpdate.artist)}`;
    const albums: Album[] = JSON.parse(this.window.localStorage.getItem(storageKey)).slice(0);
    const relevantAlbumIndex: number = albums.findIndex(album => album.title === albumToUpdate.title && album.artist === albumToUpdate.artist);
    albums.splice(relevantAlbumIndex, 1, albumToUpdate);
    this.window.localStorage.setItem(storageKey, JSON.stringify(albums));
  }
}
