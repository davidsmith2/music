import { Component, ChangeDetectionStrategy, Inject, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { WINDOW } from '../window.constant';
import { Cover } from '../cover.interface';
import { Album } from '../album.interface';
import { AlbumService } from '../album.service';

@Component({
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistDetailComponent implements OnInit, OnDestroy {
  albums$: Observable<Array<Album>> = this.activatedRoute.data.pipe(
    map((data) => {
      return data.albums;
    })
  );
  queryParams$: Observable<Params> = this.activatedRoute.queryParams;
  queryParamsSub: Subscription;
  popupWindow: Window;
  selectedAlbum: Album;

  constructor(
    private activatedRoute: ActivatedRoute,
    @Inject(WINDOW) private window: Window,
    private albumService: AlbumService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.window.addEventListener('message', (messageEvent: MessageEvent) => {
      if (messageEvent.origin !== "https://covers.musichoarders.xyz") {
        return;
      };
      const cover: Cover = JSON.parse(messageEvent.data);
      this.popupWindow.close();
      this.updateAlbumCover(cover.bigCoverUrl);
    }, false);
  }

  ngOnInit() {
    this.queryParamsSub = this.queryParams$.subscribe(() => this.changeDetectorRef.markForCheck());
  }

  ngOnDestroy() {
    this.queryParamsSub.unsubscribe();
  }

  findAlbumCover(event: Event, album: Album) {
    event.preventDefault();
    this.selectedAlbum = album;
    this.popupWindow = this.window.open(
      `https://covers.musichoarders.xyz/?sources=applemusic&country=us&artist=${album.artist}&album=${album.title}&remote.port=browser&remote.agent=test&remote.text=test`,
      "covers",
      "width=600,height=400"
    );
  }

  updateAlbumCover(cover: string) {
    this.albumService.updateAlbum({...this.selectedAlbum, cover});
    this.router.navigateByUrl(`${this.router.url}?t=${Date.now()}`);
  }

}
