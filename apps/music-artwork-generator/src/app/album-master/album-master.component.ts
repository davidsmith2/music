import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Album } from '@davidsmith/api-interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlbumService } from '../core/album/album.service';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'davidsmith-album-master',
  templateUrl: './album-master.component.html',
  styleUrls: ['./album-master.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumMasterComponent {
  albums$: Observable<Array<Album>> = this.albumService.keys$.pipe(
    map((_keys: Array<string>) => {
      const query = this.apollo.client.readQuery({query: this.albumService.queries.getAlbums});
      return !!query && query['selectAll_albums']
    })
  );

  constructor(
    private albumService: AlbumService,
    private apollo: Apollo
  ) { }

}
