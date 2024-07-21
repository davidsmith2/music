import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ArtistDto } from '@music/api-interfaces';
import { Apollo } from 'apollo-angular';
import { GET_ARTISTS } from '../core/artist/artist.constants';

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
      query: GET_ARTISTS
    }).valueChanges.pipe(
      map((result) => result.data['getArtists'])
    )
  }

}
