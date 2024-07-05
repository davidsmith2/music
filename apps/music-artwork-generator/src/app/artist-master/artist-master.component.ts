import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { LibraryDto } from '@davidsmith/api-interfaces';
import { Apollo } from 'apollo-angular';
import { SELECT_ONE_LIBRARY } from '../core/library/library.constants';

@Component({
  templateUrl: './artist-master.component.html',
  styleUrls: ['./artist-master.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistMasterComponent implements OnInit {
  library$: Observable<LibraryDto>;

  constructor(
    private apollo: Apollo
  ) { }
  
  ngOnInit(): void {
    this.library$ = of(this.apollo.client.readQuery({
      query: SELECT_ONE_LIBRARY,
      variables: {
        id: '951a9862'
      }
    })).pipe(
      map((query) => {
        return !!query && query['selectOne_library'] || null;
      })
    )
  }

}
