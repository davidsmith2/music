import { Injectable } from "@angular/core";
import { ArtistService } from "../artist/artist.service";
import { AlbumService } from "../album/album.service";
import { relatedEntity, rootEntities, rootEntity } from "ngrx-entity-relationship";
import { SongService } from "../song/song.service";

@Injectable({providedIn: 'root'})
export class ArtistRelationshipService {
  selectArtist = rootEntity(
    this.artistService,
    relatedEntity(
      this.albumService,
      'albumIds',
      'albums'
    )
  );

  selectArtists = rootEntities(this.selectArtist);
  
  constructor(
    private artistService: ArtistService,
    private albumService: AlbumService,
    private songService: SongService
  ) {}
  
}