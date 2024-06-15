import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LibraryService } from './core/library/library.service';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Library } from '@davidsmith/api-interfaces';

@Component({
  selector: 'davidsmith-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  library$: Observable<Library>;

  constructor(private libraryService: LibraryService) {
    this.library$ = this.libraryService.getLibrary().pipe(take(1));
  }

}
