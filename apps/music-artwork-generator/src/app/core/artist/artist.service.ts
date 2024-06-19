import { Injectable } from "@angular/core";
import { Artist } from "@davidsmith/api-interfaces";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { Dictionary } from "@ngrx/entity";
import { Observable, map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ArtistService extends EntityCollectionServiceBase<Artist> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Artist', serviceElementsFactory);
  }

  getArtists(): Observable<Array<Artist>> {
    return this.entities$;
  }

  getArtistByName(artistName: string): Observable<Artist> {
    return this.entityMap$.pipe(
      map((entityMap: Dictionary<Artist>) => {
        return entityMap[artistName];
      })
    );
  }
}
