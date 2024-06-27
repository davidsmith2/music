import { ChangeDetectionStrategy, Component } from '@angular/core';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Library } from '@davidsmith/api-interfaces';
import { Store } from '@ngrx/store';
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
    private libraryRelationshipService: LibraryRelationshipService,
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
    this.library$ = this.libraryRelationshipService.getLibraryByKey('951a9862').pipe(take(1));
  }

}
