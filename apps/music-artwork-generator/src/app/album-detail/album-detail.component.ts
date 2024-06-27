import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from '@davidsmith/api-interfaces';
import { Store, select } from '@ngrx/store';
import { toStaticSelector } from 'ngrx-entity-relationship';
import { Observable, map, switchMap } from 'rxjs';
import { AlbumRelationshipService } from '../core/album/album-relationship.service';

@Component({
  selector: 'davidsmith-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrl: './album-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumDetailComponent {
  album$: Observable<Album> = this.activatedRoute.params.pipe(
    map((params) => params.id),
    switchMap((id: string) => this.store.pipe(
      select(toStaticSelector(this.albumRelationshipService.selectAlbumDetail, id))
    ))
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private albumRelationshipService: AlbumRelationshipService
  ) { }

}
