import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Artist } from '@davidsmith/api-interfaces';

@Component({
  templateUrl: './artist-master.component.html',
  styleUrls: ['./artist-master.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistMasterComponent {
  artists$: Observable<Array<Artist>> = this.activatedRoute.data.pipe(
    map(data => data.artists)
  );

  completeArtists$ = this.artists$.pipe(
    map(artists => artists.filter(artist => {
      const numAlbums = artist.albums.length;
      const numCovers = artist.albums.filter(album => album.cover).length;
      return numAlbums === numCovers;
    }))
  );

  incompleteArtists$ = this.artists$.pipe(
    map(artists => artists.filter(artist => {
      const numAlbums = artist.albums.length;
      const numCovers = artist.albums.filter(album => album.cover).length;
      return numAlbums !== numCovers;
    }))
  );

  constructor(private activatedRoute: ActivatedRoute) { }

}
