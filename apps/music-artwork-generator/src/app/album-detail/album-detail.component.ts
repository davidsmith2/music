import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Album } from '@davidsmith/api-interfaces';
import { Observable, map } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { SELECT_ONE_ALBUM } from '../core/album/album.constants';

@Component({
  selector: 'davidsmith-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrl: './album-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumDetailComponent {
  album$: Observable<Album> = this.activatedRoute.params.pipe(
    map((params: Params) => {
      const query = this.apollo.client.readQuery({query: SELECT_ONE_ALBUM, variables: {id: params.id}});
      return !!query && query['selectOne_album']
    })
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private apollo: Apollo
  ) { }

}
