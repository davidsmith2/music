import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AlbumDto } from '@music/api-interfaces';
import { Observable, switchMap } from 'rxjs';
import { AlbumService } from '../core/album/album.service';

@Component({
  selector: 'music-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrl: './album-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumDetailComponent {
  album$: Observable<AlbumDto> = this.activatedRoute.params.pipe(
    switchMap((params: Params) => {
      return this.albumService.getAlbum(params.id);
    })
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private albumService: AlbumService
  ) { }

}
