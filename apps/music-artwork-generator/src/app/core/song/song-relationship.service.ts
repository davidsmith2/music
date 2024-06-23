import { Injectable } from "@angular/core";
import { reduceGraph, rootEntities, rootEntity } from "ngrx-entity-relationship";
import { toGraphQL, toQuery } from "ngrx-entity-relationship/graphql";
import { tap } from "rxjs";
import { Store } from "@ngrx/store";
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
    private songService: SongService,
    private store: Store
  ) {}
  
  getAllSongs() {
    const graphQLStr = toGraphQL(
      'selectAll_songs',
      this.selectSongs,
    )
    const queryStr = toQuery(graphQLStr);
    return this.songService.getSongs('selectAll_songs', {
      httpOptions: {
        httpParams: {
          query: queryStr
        } as any,
        httpHeaders: {
          'Content-Type': 'application/json'
        }
      }
    }).pipe(
      tap((songs) => {
        this.store.dispatch(
          reduceGraph({
            data: songs,
            selector: this.selectSongs
          })
        );
        
      })
    );
  }
  
}
