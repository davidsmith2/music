import { Component, ChangeDetectionStrategy, Inject, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
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
  albums$: Observable<Array<Album>>;
  popupWindow: Window;
  selectedArtist: string;
  selectedAlbum: Album;

  constructor(
    private activatedRoute: ActivatedRoute,
    @Inject(WINDOW) private window: Window,
    private albumService: AlbumService
  ) {
    this.albums$ = this.activatedRoute.params.pipe(
      tap((params: Params) => {
        this.selectedArtist = params.name;
      }),
      switchMap(() => this.albumService.getAlbumsByArtistName(this.selectedArtist))
    );
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
    //
  }

  ngOnDestroy() {
    //
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
  }

}
