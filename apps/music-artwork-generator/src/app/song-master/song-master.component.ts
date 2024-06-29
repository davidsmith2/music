import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Song } from '@davidsmith/api-interfaces';
import { Observable } from 'rxjs';
import { SongService } from '../core/song/song.service';

@Component({
  templateUrl: './song-master.component.html',
  styleUrl: './song-master.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SongMasterComponent {
  songs$: Observable<Array<Song>> = this.songService.getSongs();

  constructor(
    private songService: SongService
  ) { }

}
