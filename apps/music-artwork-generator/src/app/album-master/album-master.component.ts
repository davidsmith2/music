import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'davidsmith-album-master',
  templateUrl: './album-master.component.html',
  styleUrls: ['./album-master.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumMasterComponent implements OnInit, OnDestroy {
  albums$: Observable<any>;
  albumsSub: Subscription;

  constructor(
    private httpClient: HttpClient
  ) {
    this.albums$ = this.httpClient.get<any>('/api');
  }

  ngOnInit(): void {
    this.albumsSub = this.albums$.subscribe();
  }

  ngOnDestroy(): void {
    if (this.albumsSub) {
      this.albumsSub.unsubscribe();
    }
  }

  clickMe(event: Event) {
    event.preventDefault();
    console.log(event);
  }

}
