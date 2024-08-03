import { Injectable } from '@angular/core';
import { SongDto } from '@music/api-interfaces';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Apollo } from 'apollo-angular';
import { Observable, catchError, map, of } from 'rxjs';
import { GET_SONGS } from './song.constants';

@Injectable({ providedIn: 'root' })
export class SongService extends EntityCollectionServiceBase<SongDto> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private apollo: Apollo
  ) {
    super('Song', serviceElementsFactory);
  }
  getSongs(): Observable<Array<SongDto>> {
    return this.apollo
      .watchQuery({
        query: GET_SONGS,
      })
      .valueChanges.pipe(
        map((res) => {
          return res['data']['getSongs'];
        }),
        catchError((err) => {
          return of(null);
        })
      );
  }
}
