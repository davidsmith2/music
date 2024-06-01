import { HttpClient } from "@angular/common/http";
import { Observable, iif, of } from "rxjs";
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

  getAlbums(): Observable<Album[]> {
    return iif(
      () => this.window.localStorage.getItem('albums') !== null,
      of(JSON.parse(this.window.localStorage.getItem('albums'))),
      this.httpClient.get<Album[]>('/api/artist').pipe(
        tap(albums => {
          this.window.localStorage.setItem('albums', JSON.stringify(albums));
        })
      )
    );
  }

  getAlbumByArtistAndAlbum(artist: string, album: string): Observable<Album> {
    const albums: Album[] = JSON.parse(this.window.localStorage.getItem('albums'));
    return of(albums.find(o => o.album === album && o.artist === artist));
  }

  updateAlbum(albumToUpdate: Album): void {
    const albums: Album[] = JSON.parse(this.window.localStorage.getItem('albums')).slice(0);
    const relevantAlbumIndex: number = albums.findIndex(album => album.album === albumToUpdate.album && album.artist === albumToUpdate.artist);
    const relevantAlbum: Album = albums.find(o => o.album === albumToUpdate.album && o.artist === albumToUpdate.artist);
    relevantAlbum.cover = albumToUpdate.cover;
    albums.splice(relevantAlbumIndex, 1, relevantAlbum);
    this.window.localStorage.setItem('albums', JSON.stringify(albums));
  }
}
