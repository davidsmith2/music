import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LibraryService } from '../core/library/library.service';
import { LibrarySummaryDto } from '@music/api-interfaces';
import { Observable, take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'music-library',
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryComponent {
  librarySummary$: Observable<LibrarySummaryDto>;

  constructor(
    private libraryService: LibraryService,
    private activatedRoute: ActivatedRoute
  ) {
    const user = this.activatedRoute.snapshot.data['user'];
    this.librarySummary$ = this.libraryService.getLibrary(user.username).pipe(take(1));
  }
}
