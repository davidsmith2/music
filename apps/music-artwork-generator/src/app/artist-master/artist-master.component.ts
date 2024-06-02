import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Artist } from '../artist.interface';

@Component({
  templateUrl: './artist-master.component.html',
  styleUrls: ['./artist-master.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistMasterComponent {
  artists$: Observable<Array<Artist>> = this.activatedRoute.data.pipe(
    map(data => data.artists)
  );

  constructor(private activatedRoute: ActivatedRoute) { }

}
