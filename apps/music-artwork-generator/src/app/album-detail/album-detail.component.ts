import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Album } from '@davidsmith/api-interfaces';
import { Observable, map } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { AlbumService } from '../core/album/album.service';

@Component({
  selector: 'davidsmith-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrl: './album-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumDetailComponent {
  album$: Observable<Album> = this.activatedRoute.params.pipe(
    map((params: Params) => {
      const query = this.apollo.client.readQuery({query: this.albumService.queries.getAlbum, variables: {id: params.id}});
      return !!query && query['selectOne_album']
    })
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private albumService: AlbumService,
    private apollo: Apollo
  ) { }

}
