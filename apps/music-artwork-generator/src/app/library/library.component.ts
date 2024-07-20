import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LibraryService } from '../core/library/library.service';
import { LibrarySummaryDto } from '@davidsmith/api-interfaces';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'davidsmith-library',
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LibraryComponent {
  librarySummary$: Observable<LibrarySummaryDto>;

  constructor(
    private libraryService: LibraryService,
  ) {
    this.librarySummary$ = this.libraryService.getLibrary('951a9862').pipe(take(1));
  }

}
