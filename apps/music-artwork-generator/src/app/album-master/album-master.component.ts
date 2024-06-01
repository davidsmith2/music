import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from '../album.interface';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Artist } from '../artist.interface';

@Component({
  templateUrl: './album-master.component.html',
  styleUrls: ['./album-master.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumMasterComponent {
  artists$: Observable<Array<Artist>> = this.activatedRoute.data.pipe(
    map(data => data.artists)
  );

  constructor(private activatedRoute: ActivatedRoute) { }

}
