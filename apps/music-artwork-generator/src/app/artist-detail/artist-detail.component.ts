import { Component, ChangeDetectionStrategy, Inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { WINDOW } from '../window.constant';
import { Cover } from '../core/cover/cover.interface';
import { AlbumDto } from '@davidsmith/api-interfaces';
import { ArtistDto } from '@davidsmith/api-interfaces';
import { AlbumService } from '../core/album/album.service';
import { ArtistService } from '../core/artist/artist.service';

@Component({
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistDetailComponent implements OnInit, OnDestroy {
  artist$: Observable<ArtistDto> = this.activatedRoute.params.pipe(
    switchMap((params: Params) => {
      return this.artistService.getArtist(params.id);
    })
  );

  selectedAlbum: AlbumDto;
  popupWindow: Window;

  constructor(
    private activatedRoute: ActivatedRoute,
    @Inject(WINDOW) private window: Window,
    private artistService: ArtistService,
    private albumService: AlbumService
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
    //
  }

  ngOnDestroy() {
    //
  }

  findAlbumCover(event: Event, album: AlbumDto) {
    event.preventDefault();
    this.selectedAlbum = album;
    this.popupWindow = this.window.open(
      `https://covers.musichoarders.xyz/?sources=applemusic&country=us&artist=${album.artist}&album=${album.title}&remote.port=browser&remote.agent=test&remote.text=test`,
      "covers",
      "width=600,height=400"
    );
  }

  updateAlbumCover(cover: string) {
    this.albumService.updateAlbum({
      id: this.selectedAlbum.id,
      cover
    }).pipe(
      take(1),
      tap(() => {
        this.selectedAlbum = null;
      })
    ).subscribe();
  }

}
