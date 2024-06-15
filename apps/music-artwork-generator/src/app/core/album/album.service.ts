import { HttpClient } from "@angular/common/http";
import { Observable, iif, of } from "rxjs";
import { Inject, Injectable } from "@angular/core";
import { WINDOW } from "../../window.constant";
import { Album } from "@davidsmith/api-interfaces";
import { Artist } from "@davidsmith/api-interfaces";

@Injectable({ providedIn: 'root' })
export class AlbumService {
  private readonly storageKey: string = 'artists';
  private readonly apiRoot: string = '/api';

  constructor(
    private httpClient: HttpClient,
    @Inject(WINDOW) private window: Window
  ) {}

  updateAlbum(update: Album): void {
    const artists: Array<Artist> = JSON.parse(this.window.localStorage.getItem(this.storageKey)).slice(0);
    const artist: Artist = artists.find((artist) => artist.name === update.artist);
    const albumIndex: number = artist.albums.findIndex(album => album.title === update.title);
    artist.albums.splice(albumIndex, 1, update);
    this.window.localStorage.setItem(this.storageKey, JSON.stringify(artists));
  }

  saveAlbumCover(album: Album): Observable<Album> {
    return this.httpClient.put<Album>(`${this.apiRoot}/album`, album);
  }

}
