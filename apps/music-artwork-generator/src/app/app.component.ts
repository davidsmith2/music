import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { MergeQuerySet } from '@ngrx/data';

@Component({
  selector: 'music-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(
    private store: Store
  ) {
    this.store.dispatch(
      new MergeQuerySet({
        Library: [],
        Artist: [],
        Album: [],
        Song: []
      })
    );
  }

}
