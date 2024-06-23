import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Library } from '@davidsmith/api-interfaces';
import { LibraryRelationshipService } from '../core/library/library-relationship.service';
import { Store, select } from '@ngrx/store';
import { toStaticSelector } from 'ngrx-entity-relationship';

@Component({
  templateUrl: './artist-master.component.html',
  styleUrls: ['./artist-master.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistMasterComponent {
  library$: Observable<Library> = this.store.pipe(select(toStaticSelector(this.libraryRelationshipService.selectLibrary, 1)));

  /*
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
  */

  constructor(
    private store: Store,
    private libraryRelationshipService: LibraryRelationshipService
  ) { }

}
