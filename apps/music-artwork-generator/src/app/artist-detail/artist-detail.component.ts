import { Component, ChangeDetectionStrategy, Inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { WINDOW } from '../window.constant';
import { Cover } from '../core/cover/cover.interface';
import { Album } from '@davidsmith/api-interfaces';
import { Artist } from '@davidsmith/api-interfaces';
import { AlbumRelationshipService } from '../core/album/album-relationship.service';
import { ArtistService } from '../core/artist/artist.service';
import { Apollo } from 'apollo-angular';

@Component({
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistDetailComponent implements OnInit, OnDestroy {
  artist$: Observable<Artist> = this.activatedRoute.params.pipe(
    map((_params) => {
      const query = this.apollo.client.readQuery({ query: this.artistService.queries.getArtist });
      return !!query && query['selectOne_artist'] || null;
    })
  );

  selectedAlbum: Album;
  popupWindow: Window;

  constructor(
    private activatedRoute: ActivatedRoute,
    @Inject(WINDOW) private window: Window,
    private artistService: ArtistService,
    private albumRelationshipService: AlbumRelationshipService,
    private router: Router,
    private apollo: Apollo
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
    this.albumRelationshipService.updateAlbum({...this.selectedAlbum, cover}).pipe(
      take(1),
      tap(() => {
        this.selectedAlbum = null;
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {
            refresh: new Date().getTime()
          },
          queryParamsHandling: 'merge'
        });
      })
    ).subscribe();
  }

  getNumberOfArtistAlbums(albums: Album[]): number {
    return albums.length;
  }

  getNumberOfArtistSongs(albums: Album[]): number {
    return albums.reduce((total, album) => total + album.songs.length, 0);
  }

  getNumberOfAlbumSongs(album: Album): number {
    return album.songs?.length;
  }

}
