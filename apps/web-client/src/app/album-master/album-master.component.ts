import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AlbumDto } from '@music/api-interfaces';
import { Observable } from 'rxjs';
import { AlbumService } from '../core/album/album.service';

@Component({
  selector: 'music-album-master',
  templateUrl: './album-master.component.html',
  styleUrls: ['./album-master.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumMasterComponent {
  albums$: Observable<Array<AlbumDto>> = this.albumService.getAlbums();

  constructor(private albumService: AlbumService) {}
}
