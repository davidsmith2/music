import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from '../album.interface';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './album-master.component.html',
  styleUrls: ['./album-master.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumMasterComponent {
  albums$: Observable<Array<Album>> = this.activatedRoute.data.pipe(
    map(data => data.albums)
  );

  constructor(private activatedRoute: ActivatedRoute) { }

}
