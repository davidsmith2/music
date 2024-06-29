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
  albums$: Observable<Array<Album>> = this.albumService.getAlbums();

  constructor(
    private albumService: AlbumService
  ) { }

}
