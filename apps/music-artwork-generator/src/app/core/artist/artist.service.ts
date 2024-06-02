import { HttpClient } from "@angular/common/http";
import { Observable, iif, of } from "rxjs";
import { Inject, Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { WINDOW } from "../../window.constant";
import { Artist } from "./artist.interface";
import { Album } from "../album/album.interface";

@Injectable({ providedIn: 'root' })
export class ArtistService {
  private readonly storageKey: string = 'artists';
  private readonly apiEndpoint: string = '/api/artist';

  constructor(
    private httpClient: HttpClient,
    @Inject(WINDOW) private window: Window
  ) {}

  getArtists(): Observable<Array<Artist>> {
    return iif(
      () => this.window.localStorage.getItem(this.storageKey) !== null,
      of(JSON.parse(this.window.localStorage.getItem(this.storageKey))),
      this.httpClient.get<Array<Artist>>(this.apiEndpoint).pipe(
        tap((artists: Array<Artist>) => {
          this.window.localStorage.setItem(this.storageKey, JSON.stringify(artists));
        })
      )
    );
  }

  getArtistByName(name: string): Observable<Artist> {
    return of(JSON.parse(this.window.localStorage.getItem(this.storageKey))).pipe(
      map((artists: Array<Artist>) => {
        return artists.find(artist => artist.name === name);
      })
    );
  }

  updateAlbum(update: Album): void {
    const artists: Array<Artist> = JSON.parse(this.window.localStorage.getItem(this.storageKey)).slice(0);
    const artist: Artist = artists.find((artist) => artist.name === update.artist);
    const albumIndex: number = artist.albums.findIndex(album => album.title === update.title);
    artist.albums.splice(albumIndex, 1, update);
    this.window.localStorage.setItem(this.storageKey, JSON.stringify(artists));
  }

}
