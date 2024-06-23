import { Injectable } from "@angular/core";
import { AlbumService } from "../album/album.service";
import { reduceGraph, rootEntities, rootEntity } from "ngrx-entity-relationship";
import { toGraphQL, toQuery } from "ngrx-entity-relationship/graphql";
import { Store } from "@ngrx/store";
import { tap } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class AlbumRelationshipService {
  selectAlbum = rootEntity(
    this.albumService,
    {
      gqlFields: {
        id: '',
        title: '',
        artist: ''
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

}