import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Library } from '@davidsmith/api-interfaces';
import { Apollo } from 'apollo-angular';
import { SELECT_ONE_LIBRARY } from '../core/library/library.constants';

@Component({
  templateUrl: './artist-master.component.html',
  styleUrls: ['./artist-master.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistMasterComponent implements OnInit {
  library$: Observable<Library>;

  constructor(
    private apollo: Apollo
  ) { }
  
  ngOnInit(): void {
    this.library$ = of(this.apollo.client.readQuery({ query: SELECT_ONE_LIBRARY })).pipe(
      map((query) => {
        return !!query && query['selectOne_library'] || null;
      })
    )
  }

}
