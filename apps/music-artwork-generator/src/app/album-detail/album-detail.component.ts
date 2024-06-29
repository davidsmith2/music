import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Album } from '@davidsmith/api-interfaces';
import { Observable, switchMap } from 'rxjs';
import { AlbumService } from '../core/album/album.service';

@Component({
  selector: 'davidsmith-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrl: './album-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumDetailComponent {
  album$: Observable<Album> = this.activatedRoute.params.pipe(
    switchMap((params: Params) => {
      return this.albumService.getAlbum(params.id);
    })
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private albumService: AlbumService
  ) { }

}
