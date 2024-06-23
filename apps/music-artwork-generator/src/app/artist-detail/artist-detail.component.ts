import { Component, ChangeDetectionStrategy, Inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { WINDOW } from '../window.constant';
import { Cover } from '../core/cover/cover.interface';
import { Album } from '@davidsmith/api-interfaces';
import { Artist } from '@davidsmith/api-interfaces';
import { ArtistService } from '../core/artist/artist.service';
import { toFactorySelector, toStaticSelector } from 'ngrx-entity-relationship';
import { ArtistRelationshipService } from '../core/artist/artist-relationship.service';
import { Store, select } from '@ngrx/store';

@Component({
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistDetailComponent implements OnInit, OnDestroy {
  artist$: Observable<Artist> = this.activatedRoute.params.pipe(
    map((params) => params.id),
    switchMap((id: string) => this.store.pipe(
      select(toStaticSelector(this.artistRelationshipService.selectArtist, id))
    ))
  );

  selectedAlbum: Album;
  popupWindow: Window;

  constructor(
    private activatedRoute: ActivatedRoute,
    @Inject(WINDOW) private window: Window,
    private artistRelationshipService: ArtistRelationshipService,
    private router: Router,
    private store: Store
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
    // this.albumService.updateAlbum({...this.selectedAlbum, cover});
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
    /*
    this.albumService.saveAlbumCover(album).pipe(
      take(1)
    ).subscribe();
    */
  }

}
