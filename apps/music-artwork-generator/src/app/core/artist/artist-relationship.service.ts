import { Injectable } from "@angular/core";
import { ArtistService } from "../artist/artist.service";
import { AlbumService } from "../album/album.service";
import { reduceGraph, relatedEntity, rootEntities, rootEntity } from "ngrx-entity-relationship";
import { toGraphQL, toQuery } from "ngrx-entity-relationship/graphql";
import { Store } from "@ngrx/store";
import { tap } from "rxjs/operators";
import { SongService } from "../song/song.service";

@Injectable({providedIn: 'root'})
export class ArtistRelationshipService {
  selectArtist = rootEntity(
    this.artistService,
    {
      gqlFields: {
        id: '',
        name: '',
        albumIds: '',
        albums: '{id, title}'
      }
    },
    relatedEntity(
      this.albumService,
      'albumIds',
      'albums',
      {
        gqlFields: {
          id: '',
          title: '',
          songIds: '',
          songs: '{id, title}'
        }
      },
      relatedEntity(
        this.songService,
        'songIds',
        'songs',
        { gqlFields: ['id', 'title'] }
      )
    )
  );

  selectArtists = rootEntities(this.selectArtist);
  
  constructor(
    private artistService: ArtistService,
    private albumService: AlbumService,
    private songService: SongService,
    private store: Store
  ) {}
  
  getArtistByKey(key: string) {
    const graphQLStr = toGraphQL(
      'selectOne_artist',
      {id: key},
      this.selectArtist,
    )
    const queryStr = toQuery(graphQLStr);
    return this.artistService.getArtist('selectOne_artist', {
      httpOptions: {
        httpParams: {
          query: queryStr
        } as any,
        httpHeaders: {
          'Content-Type': 'application/json'
        }
      }
    }).pipe(
      tap((library) => {
        this.store.dispatch(
          reduceGraph({
            data: library,
            selector: this.selectArtist
          })
        );

      })
    );
  }

}