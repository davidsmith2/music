import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WINDOW } from './window.constant';
import { Cover } from './cover.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'davidsmith-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  albums$: Observable<any>;
  albumsSub: Subscription;

  constructor(
    @Inject(WINDOW) private window: Window,
    private httpClient: HttpClient
  ) {
    this.window.addEventListener('message', function(messageEvent: MessageEvent) {
      if (messageEvent.origin !== "https://covers.musichoarders.xyz") return;
      const cover: Cover = JSON.parse(messageEvent.data);
      console.log(cover);
    }, false);
    this.albums$ = this.httpClient.get<any>('/api');
  }

  ngOnInit(): void {
    this.albumsSub = this.albums$.subscribe();
  }

  ngAfterViewInit(): void {
    this.window.open(
      "https://covers.musichoarders.xyz/?sources=applemusic&country=us&artist=The+Band&album=Greatest+Hits&remote.port=browser&remote.agent=test&remote.text=test",
      "theframe"
    );
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
