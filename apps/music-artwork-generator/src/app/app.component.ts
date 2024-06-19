import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LibraryService } from './core/library/library.service';
import { map, take } from 'rxjs/operators';
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
    console.log(this.libraryService)
    this.library$ = this.libraryService.getByKey('1').pipe(take(1));
  }

}
