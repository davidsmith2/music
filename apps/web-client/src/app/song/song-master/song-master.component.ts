import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SongDto } from '@music/api-interfaces';
import { Observable } from 'rxjs';
import { SongService } from '../../core/song/song.service';

@Component({
  templateUrl: './song-master.component.html',
  styleUrl: './song-master.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SongMasterComponent {
  songs$: Observable<Array<SongDto>> = this.songService.getSongs();

  constructor(private songService: SongService) {}
}
