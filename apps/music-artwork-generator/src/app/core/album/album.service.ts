import { HttpClient } from "@angular/common/http";
import { Observable, iif, of } from "rxjs";
import { Album } from "./album.interface";
import { Inject, Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { WINDOW } from "../../window.constant";
import { Artist } from "../artist/artist.interface";

@Injectable({ providedIn: 'root' })
export class AlbumService {
  constructor(
    private httpClient: HttpClient,
    @Inject(WINDOW) private window: Window
  ) {}

  getAlbumsByArtistName(artistName: string): Observable<Album[]> {
    const storageKey: string = 'artists';
    return of(JSON.parse(this.window.localStorage.getItem(storageKey))).pipe(
      map((artists: Array<Artist>) => {
        return artists.find(artist => artist.name === artistName).albums;
      })
    );
  }

  updateAlbum(albumToUpdate: Album): void {
    const storageKey: string = 'artists';
    const artists: Array<Artist> = JSON.parse(this.window.localStorage.getItem(storageKey)).slice(0);
    const artistToUpdate: Artist = artists.find((artist) => artist.name === albumToUpdate.artist);
    const relevantArtistIndex: number = artists.findIndex(artist => artist.name === albumToUpdate.artist);
    const albums: Array<Album> = artists.find((artist: Artist) => artist.name === albumToUpdate.artist).albums;
    const relevantAlbumIndex: number = albums.findIndex(album => album.title === albumToUpdate.title);
    albums.splice(relevantAlbumIndex, 1, albumToUpdate);
    artistToUpdate.albums = albums;
    this.window.localStorage.setItem(storageKey, JSON.stringify(artists));
  }
}
