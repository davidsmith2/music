import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Song } from '@davidsmith/api-interfaces';
import { Store, select } from '@ngrx/store';
import { Observable, switchMap } from 'rxjs';
import { SongRelationshipService } from '../core/song/song-relationship.service';
import { toFactorySelector, toStaticSelector } from 'ngrx-entity-relationship';
import { SongService } from '../core/song/song.service';

@Component({
  templateUrl: './song-master.component.html',
  styleUrl: './song-master.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SongMasterComponent {
  songs$: Observable<Array<Song>> = this.songService.keys$.pipe(
    switchMap(keys => {
      const selector = toStaticSelector(this.songRelationshipService.selectSongs, keys);
      const selection = select(selector);
      return this.store.pipe(selection);
    })
  );

  constructor(
    private songService: SongService,
    private store: Store,
    private songRelationshipService: SongRelationshipService
  ) { }

}
