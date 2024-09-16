import { Injectable } from '@angular/core';
import { SongDto, UserDto } from '@music/api-interfaces';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Apollo } from 'apollo-angular';
import { Observable, catchError, map, of } from 'rxjs';
import { GET_USER_BY_USERNAME } from './user.constants';

@Injectable({ providedIn: 'root' })
export class UserService extends EntityCollectionServiceBase<SongDto> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private apollo: Apollo
  ) {
    super('User', serviceElementsFactory);
  }
  getUserByUsername(username: string): Observable<UserDto> {
    return this.apollo
      .watchQuery({
        query: GET_USER_BY_USERNAME,
        variables: {
          username
        }
      })
      .valueChanges.pipe(
        map((res) => {
          return res['data']['getUser'];
        }),
        catchError((err) => {
          return of(null);
        })
      );
  }
}
