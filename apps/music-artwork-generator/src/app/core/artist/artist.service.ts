import { Injectable } from "@angular/core";
import { ArtistDto } from "@music/api-interfaces";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { Apollo } from "apollo-angular";
import { Observable, catchError, map, of } from "rxjs";
import { GET_ARTIST } from "./artist.constants";

@Injectable({ providedIn: 'root' })
export class ArtistService extends EntityCollectionServiceBase<ArtistDto> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private apollo: Apollo
  ) {
    super('Artist', serviceElementsFactory);
  }

  getArtist(_id: string): Observable<ArtistDto> {
    return this.apollo.watchQuery({
      query: GET_ARTIST,
      variables: {
        _id
      }
    }).valueChanges.pipe(
      map(result => {
        return result.data['getArtist'];
      }),
      catchError(err => {
        console.error(err);
        return of(null);
      })
    );
  }

}
