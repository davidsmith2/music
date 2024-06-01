import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { WINDOW } from '../window.constant';
import { tap } from 'rxjs/operators';

@Component({
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumDetailComponent implements OnInit, OnDestroy {
  album$: Observable<any> = this.activatedRoute.queryParams;
  albumSub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    @Inject(WINDOW) private window: Window
  ) { }

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
    this.window.open(
      `https://covers.musichoarders.xyz/?sources=applemusic&country=us&artist=${album.artist}&album=${album.album}&remote.port=browser&remote.agent=test&remote.text=test`,
      "covers",
      "width=1200,height=800"
    );
  }

}
