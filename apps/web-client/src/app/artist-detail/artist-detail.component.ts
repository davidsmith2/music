import {
  Component,
  ChangeDetectionStrategy,
  Inject,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { WINDOW } from '../window.constant';
import { Cover } from '../core/cover/cover.interface';
import { AlbumDto } from '@music/api-interfaces';
import { ArtistDto } from '@music/api-interfaces';
import { AlbumService } from '../core/album/album.service';
import { ArtistService } from '../core/artist/artist.service';
import { ALBUM_UPDATED_SUBSCRIPTION } from '../core/album/album.constants';
import { Apollo } from 'apollo-angular';

@Component({
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistDetailComponent implements OnInit, OnDestroy {
  artist$: Observable<ArtistDto> = this.activatedRoute.params.pipe(
    switchMap((params: Params) => {
      return this.artistService.getArtist(params.id);
    })
  );

  selectedAlbum: AlbumDto;
  popupWindow: Window;

  thing$: Observable<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    @Inject(WINDOW) private window: Window,
    private artistService: ArtistService,
    private albumService: AlbumService,
    private apollo: Apollo
  ) {
    this.thing$ = this.artist$.pipe(
      switchMap((artist: ArtistDto) => {
        return this.apollo.subscribe({
          query: ALBUM_UPDATED_SUBSCRIPTION,
          variables: {
            artistName: artist.name,
          },
          errorPolicy: 'all',
        });
      })
    );
    this.thing$.subscribe((a) => {
      console.log(a);
    });

    this.window.addEventListener(
      'message',
      (messageEvent: MessageEvent) => {
        if (messageEvent.origin !== 'https://covers.musichoarders.xyz') {
          return;
        }
        const cover: Cover = JSON.parse(messageEvent.data);
        this.popupWindow.close();
        this.updateAlbumCover(cover.bigCoverUrl);
      },
      false
    );
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
      'covers',
      'width=600,height=400'
    );
  }

  updateAlbumCover(cover: string) {
    this.albumService
      .updateAlbum({
        _id: this.selectedAlbum._id,
        title: this.selectedAlbum.title,
        artist: this.selectedAlbum.artist,
        cover,
      })
      .pipe(
        take(1),
        tap(() => {
          this.selectedAlbum = null;
        })
      )
      .subscribe();
  }
}
