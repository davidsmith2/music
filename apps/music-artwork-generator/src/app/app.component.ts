import { AfterViewInit, ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { WINDOW } from './window.constant';
import { Cover } from './cover.interface';

@Component({
  selector: 'davidsmith-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  constructor(
    @Inject(WINDOW) private window: Window,
  ) {
    this.window.addEventListener('message', function(messageEvent: MessageEvent) {
      if (messageEvent.origin !== "https://covers.musichoarders.xyz") return;
      const cover: Cover = JSON.parse(messageEvent.data);
      console.log(cover);
    }, false);
  }

}
