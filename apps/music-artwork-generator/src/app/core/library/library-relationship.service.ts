import { Injectable } from "@angular/core";
import { LibraryService } from "./library.service";
import { ArtistService } from "../artist/artist.service";
import { AlbumService } from "../album/album.service";
import { relatedEntity, rootEntity } from "ngrx-entity-relationship";

@Injectable({providedIn: 'root'})
export class LibraryRelationshipService {
  selectLibrary = rootEntity(
    this.libraryService,
    relatedEntity(
      this.artistService,
      'artistIds',
      'artists',
      relatedEntity(
        this.albumService,
        'albumIds',
        'albums'
      )
    ),
  );

  constructor(
    private libraryService: LibraryService,
    private artistService: ArtistService,
    private albumService: AlbumService
  ) {}

}