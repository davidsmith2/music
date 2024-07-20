import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { ArtistDto } from '@music/api-interfaces';
import { Apollo } from 'apollo-angular';
import { SELECT_ALL_ARTISTS } from '../core/artist/artist.constants';

@Component({
  templateUrl: './artist-master.component.html',
  styleUrls: ['./artist-master.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistMasterComponent implements OnInit {
  artists$: Observable<Array<ArtistDto>>;

  constructor(
    private apollo: Apollo
  ) { }
  
  ngOnInit(): void {
    this.artists$ = this.apollo.watchQuery({
      query: SELECT_ALL_ARTISTS
    }).valueChanges.pipe(
      map((result) => result.data['selectAll_artists'])
    )
  }

}
