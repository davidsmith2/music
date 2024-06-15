import { Component, ChangeDetectionStrategy, Inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { WINDOW } from '../window.constant';
import { Cover } from '../core/cover/cover.interface';
import { Album } from '@davidsmith/api-interfaces';
import { Artist } from '@davidsmith/api-interfaces';
import { AlbumService } from '../core/album/album.service';

@Component({
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistDetailComponent implements OnInit, OnDestroy {
  artist$: Observable<Artist> = this.activatedRoute.data.pipe(
    map(data => data.artist)
  );

  albums$: Observable<Array<Album>> = this.artist$.pipe(
    map(artist => artist.albums)
  );

  completeAlbums$ = this.albums$.pipe(
    map(albums => {
      return albums.filter(album => !!album.cover);
    })
  );

  incompleteAlbums$ = this.albums$.pipe(
    map(albums => {
      return albums.filter(album => !album.cover);
    })
  );

  selectedAlbum: Album;
  popupWindow: Window;

  constructor(
    private activatedRoute: ActivatedRoute,
    @Inject(WINDOW) private window: Window,
    private albumService: AlbumService,
    private router: Router,
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
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        refresh: new Date().getTime()
      },
      queryParamsHandling: 'merge'
    });
  }

  saveAlbumCover(event: Event, album: Album) {
    event.preventDefault();
    this.albumService.saveAlbumCover(album).pipe(
      take(1)
    ).subscribe();
  }

}
