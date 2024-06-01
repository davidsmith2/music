import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Inject, NgZone, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { WINDOW } from '../window.constant';
import { Cover } from '../cover.interface';
import { Album } from '../album.interface';

@Component({
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumDetailComponent implements OnInit, OnDestroy {
  selectedAlbum: Album;
  album$: Observable<Album> = this.activatedRoute.data.pipe(
    map((data: {album: Album}) => data.album),
    tap((album: Album) => {
      this.selectedAlbum = album;
      this.changeDetectorRef.detectChanges();
    })
  );
  albumSub: Subscription;
  popupWindow: Window;

  constructor(
    private activatedRoute: ActivatedRoute,
    @Inject(WINDOW) private window: Window,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.window.addEventListener('message', (messageEvent: MessageEvent) => {
      if (messageEvent.origin !== "https://covers.musichoarders.xyz") {
        return;
      };
      const cover: Cover = JSON.parse(messageEvent.data);
      this.popupWindow.close();
      this.selectedAlbum = {...this.selectedAlbum, cover: cover.bigCoverUrl};
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

  findAlbumArtwork(event: Event, album: Album) {
    event.preventDefault();
    this.popupWindow = this.window.open(
      `https://covers.musichoarders.xyz/?sources=applemusic&country=us&artist=${album.artist}&album=${album.album}&remote.port=browser&remote.agent=test&remote.text=test`,
      "covers",
      "width=600,height=400"
    );
  }

}
