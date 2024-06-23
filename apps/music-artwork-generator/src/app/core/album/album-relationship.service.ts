import { Injectable } from "@angular/core";
import { AlbumService } from "../album/album.service";
import { reduceGraph, rootEntities, rootEntity } from "ngrx-entity-relationship";
import { toGraphQL, toMutation, toQuery } from "ngrx-entity-relationship/graphql";
import { Store } from "@ngrx/store";
import { tap } from "rxjs/operators";
import { Album } from "@davidsmith/api-interfaces";

@Injectable({providedIn: 'root'})
export class AlbumRelationshipService {
  selectAlbum = rootEntity(
    this.albumService,
    {
      gqlFields: {
        id: '',
        title: '',
        artist: '',
        cover: ''
      }
    }
  );

  selectAlbums = rootEntities(this.selectAlbum);
  
  constructor(
    private albumService: AlbumService,
    private store: Store
  ) {}
  
  getAllAlbums() {
    const graphQLStr = toGraphQL(
      'selectAll_albums',
      this.selectAlbums,
    )
    const queryStr = toQuery(graphQLStr);
    return this.albumService.getAlbums('selectAll_albums', {
      httpOptions: {
        httpParams: {
          query: queryStr
        } as any,
        httpHeaders: {
          'Content-Type': 'application/json'
        }
      }
    }).pipe(
      tap((albums) => {
        this.store.dispatch(
          reduceGraph({
            data: albums,
            selector: this.selectAlbums
          })
        );
      })
    );
  }

  updateAlbum(album: Album) {
    const graphQLStr = toGraphQL(
      'updateOne_album',
      {album: {
        id: album.id,
        cover: album.cover
      }},
      this.selectAlbums,
    )
    const queryStr = toMutation(graphQLStr);
    return this.albumService.updateAlbum('updateOne_album', {query: queryStr}, {
      httpOptions: {
        httpHeaders: {
          'Content-Type': 'application/json'
        }
      }
    }).pipe(
      tap((albums) => {
        this.store.dispatch(
          reduceGraph({
            data: albums,
            selector: this.selectAlbums
          })
        );
      })
    );
  }

}