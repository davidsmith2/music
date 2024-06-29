import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Album } from '@davidsmith/api-interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlbumService } from '../core/album/album.service';
import { Apollo } from 'apollo-angular';
import { SELECT_ALL_ALBUMS } from '../core/album/album.constants';

@Component({
  selector: 'davidsmith-album-master',
  templateUrl: './album-master.component.html',
  styleUrls: ['./album-master.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumMasterComponent {
  albums$: Observable<Array<Album>> = this.albumService.keys$.pipe(
    map((_keys: Array<string>) => {
      const query = this.apollo.client.readQuery({query: SELECT_ALL_ALBUMS});
      return !!query && query['selectAll_albums']
    })
  );

  constructor(
    private albumService: AlbumService,
    private apollo: Apollo
  ) { }

}
