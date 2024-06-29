import { ChangeDetectionStrategy, Component } from '@angular/core';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Library } from '@davidsmith/api-interfaces';
import { Store } from '@ngrx/store';
import { MergeQuerySet } from '@ngrx/data';
import { LibraryService } from './core/library/library.service';

@Component({
  selector: 'davidsmith-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  library$: Observable<Library>;

  constructor(
    private libraryService: LibraryService,
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
    this.library$ = this.libraryService.getLibrary().pipe(take(1));
  }

}
