import { HttpClient } from "@angular/common/http";
import { Observable, iif, of } from "rxjs";
import { Album } from "./album.interface";
import { Inject, Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { WINDOW } from "../../window.constant";

@Injectable({ providedIn: 'root' })
export class AlbumService {
  constructor(
    private httpClient: HttpClient,
    @Inject(WINDOW) private window: Window
  ) {}

  getAlbums(): Observable<Album[]> {
    return iif(
      () => this.window.localStorage.getItem('albums') !== null,
      of(JSON.parse(this.window.localStorage.getItem('albums'))),
      this.httpClient.get<Album[]>('/api/album').pipe(
        tap((albums: Array<Album>) => {
          this.window.localStorage.setItem('albums', JSON.stringify(albums));
        })
      )
    );
  }

  getAlbumsByArtistName(artistName: string): Observable<Album[]> {
    return of(JSON.parse(this.window.localStorage.getItem('albums'))).pipe(
      map((albums: Album[]) => {
        return albums.filter(album => album.artist === artistName);
      })
    );
  }

  updateAlbum(albumToUpdate: Album): void {
    const storageKey: string = 'albums';
    const albums: Album[] = JSON.parse(this.window.localStorage.getItem(storageKey)).slice(0);
    const relevantAlbumIndex: number = albums.findIndex(album => album.title === albumToUpdate.title && album.artist === albumToUpdate.artist);
    albums.splice(relevantAlbumIndex, 1, albumToUpdate);
    this.window.localStorage.setItem(storageKey, JSON.stringify(albums));
  }
}
