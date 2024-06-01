import { AfterViewInit, ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { WINDOW } from './window.constant';
import { Cover } from './cover.interface';

@Component({
  selector: 'davidsmith-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit {

  constructor(
    @Inject(WINDOW) private window: Window,
  ) {
    this.window.addEventListener('message', function(messageEvent: MessageEvent) {
      if (messageEvent.origin !== "https://covers.musichoarders.xyz") return;
      const cover: Cover = JSON.parse(messageEvent.data);
      console.log(cover);
    }, false);
  }

  ngAfterViewInit(): void {
    this.window.open(
      "https://covers.musichoarders.xyz/?sources=applemusic&country=us&artist=The+Band&album=Greatest+Hits&remote.port=browser&remote.agent=test&remote.text=test",
      "theframe"
    );
  }

}
