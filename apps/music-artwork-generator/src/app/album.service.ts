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
      this.httpClient.get<Album[]>('/api').pipe(
        tap(albums => {
          this.window.localStorage.setItem('albums', JSON.stringify(albums));
        })
      )
    );
  }
}