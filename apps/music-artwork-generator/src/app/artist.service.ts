import { HttpClient } from "@angular/common/http";
import { Observable, iif, of } from "rxjs";
import { Inject, Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { WINDOW } from "./window.constant";
import { Artist } from "./artist.interface";

@Injectable({ providedIn: 'root' })
export class ArtistService {
  constructor(
    private httpClient: HttpClient,
    @Inject(WINDOW) private window: Window
  ) {}

  getArtists(): Observable<Artist[]> {
    return iif(
      () => this.window.localStorage.getItem('artists') !== null,
      of(JSON.parse(this.window.localStorage.getItem('artists'))),
      this.httpClient.get<Array<Artist>>('/api/artist').pipe(
        tap((artists: Array<Artist>) => {
          this.window.localStorage.setItem('artists', JSON.stringify(artists));
        })
      )
    );
  }

}
