import { HttpClient } from "@angular/common/http";
import { Observable, iif, of } from "rxjs";
import { Inject, Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { WINDOW } from "../../window.constant";
import { Artist } from "./artist.interface";
import { Album } from "../album/album.interface";

@Injectable({ providedIn: 'root' })
export class ArtistService {
  constructor(
    private httpClient: HttpClient,
    @Inject(WINDOW) private window: Window
  ) {}

  getArtists(): Observable<Array<Artist>> {
    const storageKey: string = 'artists';
    return iif(
      () => this.window.localStorage.getItem(storageKey) !== null,
      of(JSON.parse(this.window.localStorage.getItem(storageKey))),
      this.httpClient.get<Array<Artist>>('/api/artist').pipe(
        tap((artists: Array<Artist>) => {
          this.window.localStorage.setItem(storageKey, JSON.stringify(artists));
        })
      )
    );
  }

  getArtistByName(name: string): Observable<Artist> {
    const storageKey: string = 'artists';
    return of(JSON.parse(this.window.localStorage.getItem(storageKey))).pipe(
      map((artists: Array<Artist>) => {
        return artists.find(artist => artist.name === name);
      })
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
