import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Artist } from '../core/artist/artist.interface';
import { Album } from '../core/album/album.interface';

@Component({
  templateUrl: './artist-master.component.html',
  styleUrls: ['./artist-master.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistMasterComponent {
  artists$: Observable<Array<Artist>> = this.activatedRoute.data.pipe(
    map(data => data.albums),
    map((albums: Array<Album>) => {
      return albums.reduce((results: Array<Artist>, album: Album) => {
        if (results.findIndex(artist => artist.name === album.artist) === -1) {
          results.push({
            name: album.artist
          });
        }
        return results;
      }, []).sort((a, b) => a.name.localeCompare(b.name));
    }),
  );

  constructor(private activatedRoute: ActivatedRoute) { }

}
