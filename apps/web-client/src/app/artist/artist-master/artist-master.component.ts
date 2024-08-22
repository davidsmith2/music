import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArtistDto } from '@music/api-interfaces';
import { ArtistService } from '../../core/artist/artist.service';

@Component({
  templateUrl: './artist-master.component.html',
  styleUrls: ['./artist-master.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistMasterComponent implements OnInit {
  artists$: Observable<Array<ArtistDto>>;

  constructor(private artistService: ArtistService) {}

  ngOnInit(): void {
    this.artists$ = this.artistService.getArtists();
  }
}
