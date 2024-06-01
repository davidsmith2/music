import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Inject, NgZone, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { WINDOW } from '../window.constant';
import { Cover } from '../cover.interface';

@Component({
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumDetailComponent implements OnInit, OnDestroy {
  album$: Observable<any> = this.activatedRoute.queryParams.pipe(
    tap((_queryParams: Params) => {
      this.albumArtwork = {};
    })
  );
  albumSub: Subscription;
  albumArtwork: any;
  popupWindow: Window;

  constructor(
    private activatedRoute: ActivatedRoute,
    @Inject(WINDOW) private window: Window,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.window.addEventListener('message', (messageEvent: MessageEvent) => {
      if (messageEvent.origin !== "https://covers.musichoarders.xyz") return;
      const cover: Cover = JSON.parse(messageEvent.data);
      console.log(cover)
      this.popupWindow.close();
      this.albumArtwork = {
        src: cover.bigCoverUrl,
        width: 400,
        height: 400
      };
      this.changeDetectorRef.detectChanges();
    }, false);
  }

  ngOnInit(): void {
    this.albumSub = this.album$.subscribe();
  }

  ngOnDestroy(): void {
    if (this.albumSub) {
      this.albumSub.unsubscribe();
    }
  }

  findAlbumArtwork(event: Event, album: any) {
    event.preventDefault();
    this.popupWindow = this.window.open(
      `https://covers.musichoarders.xyz/?sources=applemusic&country=us&artist=${album.artist}&album=${album.album}&remote.port=browser&remote.agent=test&remote.text=test`,
      "covers",
      "width=600,height=400"
    );
  }

}
