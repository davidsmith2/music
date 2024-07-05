import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AlbumDto } from '@davidsmith/api-interfaces';
import { Observable } from 'rxjs';
import { AlbumService } from '../core/album/album.service';

@Component({
  selector: 'davidsmith-album-master',
  templateUrl: './album-master.component.html',
  styleUrls: ['./album-master.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumMasterComponent {
  albums$: Observable<Array<AlbumDto>> = this.albumService.getAlbums();

  constructor(
    private albumService: AlbumService
  ) { }

}
