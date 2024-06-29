import { Injectable } from "@angular/core";
import { rootEntities, rootEntity } from "ngrx-entity-relationship";
import { toGraphQL } from "ngrx-entity-relationship/graphql";
import { SongService } from "./song.service";

@Injectable({providedIn: 'root'})
export class SongRelationshipService {
  selectSong = rootEntity(
    this.songService,
    {
      gqlFields: {
        id: '',
        title: '',
        artist: '',
        album: ''
      }
    }
  );

  selectSongs = rootEntities(this.selectSong);
  
  constructor(
    private songService: SongService
  ) {}
  
  getAllSongs() {
    const graphQLStr = toGraphQL(
      'selectAll_songs',
      this.selectSongs,
    )
    return this.songService.getSongs('selectAll_songs', {
      httpOptions: {
        httpParams: {
          query: graphQLStr
        } as any,
        httpHeaders: {
          'Content-Type': 'application/json'
        }
      }
    });
  }
  
}
