import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from '@davidsmith/api-interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'davidsmith-album-master',
  templateUrl: './album-master.component.html',
  styleUrls: ['./album-master.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumMasterComponent {
  albums$: Observable<Array<Album>>;

  constructor(private activatedRoute: ActivatedRoute) {
    this.albums$ = this.activatedRoute.data.pipe(
      map(data => data.albums)
    );
  }

}
