import { Injectable } from "@angular/core";
import { ArtistDto } from "@music/api-interfaces";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { Apollo } from "apollo-angular";
import { Observable, catchError, map, of } from "rxjs";
import { SELECT_ONE_ARTIST } from "./artist.constants";

@Injectable({ providedIn: 'root' })
export class ArtistService extends EntityCollectionServiceBase<ArtistDto> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private apollo: Apollo
  ) {
    super('Artist', serviceElementsFactory);
  }

  getArtist(id: string): Observable<ArtistDto> {
    return this.apollo.watchQuery({
      query: SELECT_ONE_ARTIST,
      variables: {
        id
      }
    }).valueChanges.pipe(
      map(result => {
        return result.data['selectOne_artist'];
      }),
      catchError(err => {
        console.error(err);
        return of(null);
      })
    );
  }

}
