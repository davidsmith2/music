import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LibraryService } from './core/library/library.service';
import { take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Library } from '@davidsmith/api-interfaces';
import { Store } from '@ngrx/store';
import { reduceGraph } from 'ngrx-entity-relationship';
import { LibraryRelationshipService } from './core/library/library-relationship.service';
import { MergeQuerySet } from '@ngrx/data';

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
    private libraryRelationshipService: LibraryRelationshipService,
    private store: Store
  ) {
    this.store.dispatch(
      new MergeQuerySet({
        Library: [],
        Artist: [],
        Album: []
      })
    );
    this.library$ = this.libraryService.getByKey('1').pipe(
      take(1),
      tap((library: Library) => {
        this.store.dispatch(
          reduceGraph({
            data: library,
            selector: this.libraryRelationshipService.selectLibrary
          })
        );
      })
    );
  }

}
