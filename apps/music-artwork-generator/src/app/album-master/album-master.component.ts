import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Album } from '@davidsmith/api-interfaces';
import { Store, select } from '@ngrx/store';
import { toStaticSelector } from 'ngrx-entity-relationship';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AlbumRelationshipService } from '../core/album/album-relationship.service';
import { AlbumService } from '../core/album/album.service';

@Component({
  selector: 'davidsmith-album-master',
  templateUrl: './album-master.component.html',
  styleUrls: ['./album-master.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumMasterComponent {
  albums$: Observable<Array<Album>> = this.albumService.keys$.pipe(
    switchMap((keys: Array<string>) => this.store.pipe(
      select(toStaticSelector(this.albumRelationshipService.selectAlbumsMaster, keys))
    ))
  );

  constructor(
    private albumService: AlbumService,
    private store: Store,
    private albumRelationshipService: AlbumRelationshipService
  ) { }

}
