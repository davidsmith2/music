import { Injectable } from "@angular/core";
import { SongDto } from "@music/api-interfaces";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { Apollo } from "apollo-angular";
import { Observable, catchError, map, of } from "rxjs";
import { SELECT_ALL_SONGS } from "./song.constants";

@Injectable({ providedIn: 'root' })
export class SongService extends EntityCollectionServiceBase<SongDto> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private apollo: Apollo
  ) {
    super('Song', serviceElementsFactory);
  }
  getSongs(): Observable<Array<SongDto>> {
    return this.apollo.watchQuery({
      query: SELECT_ALL_SONGS,
    }).valueChanges.pipe(
      map((res) => {
        return res['data']['selectAll_songs'];
      }),
      catchError((err) => {
        return of(null);
      })
    );
  }
}
