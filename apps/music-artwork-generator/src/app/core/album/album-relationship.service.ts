import { Injectable } from "@angular/core";
import { AlbumService } from "../album/album.service";
import { reduceGraph, relatedEntity, rootEntities, rootEntity } from "ngrx-entity-relationship";
import { toGraphQL, toMutation } from "ngrx-entity-relationship/graphql";
import { Store } from "@ngrx/store";
import { tap } from "rxjs/operators";
import { Album } from "@davidsmith/api-interfaces";
import { SongService } from "../song/song.service";

@Injectable({providedIn: 'root'})
export class AlbumRelationshipService {

  createSelectAlbum = (albumGqlFields, songGqlFields?) => {
    if (songGqlFields) {
      return rootEntity(
        this.albumService,
        {gqlFields: albumGqlFields},
        relatedEntity(
          this.songService,
          'songIds',
          'songs',
          { gqlFields: songGqlFields}
        )
      );
    } else {
      return rootEntity(
        this.albumService,
        {gqlFields: albumGqlFields}
      );
    }
  };

  selectAlbumMaster = this.createSelectAlbum({
    id: '',
    title: '',
    artist: '',
    cover: ''
  });

  selectAlbumDetail = this.createSelectAlbum({
    id: '',
    title: '',
    artist: '',
    cover: '',
    songs: '{id, title}'
  }, ['id', 'title']);

  selectAlbumsMaster = rootEntities(this.selectAlbumMaster);
  
  selectAlbumsDetail = rootEntities(this.selectAlbumDetail);
  
  constructor(
    private albumService: AlbumService,
    private songService: SongService,
    private store: Store
  ) {}
  
  getAllAlbums() {
    const graphQLStr = toGraphQL(
      'selectAll_albums',
      this.selectAlbumsMaster,
    )
    return this.albumService.getAlbums('selectAll_albums', {
      httpOptions: {
        httpParams: {
          query: graphQLStr
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
            selector: this.selectAlbumsMaster
          })
        );
      })
    );
  }

  getAlbum(key: string) {
    const graphQLStr = toGraphQL(
      'selectOne_album',
      {id: key},
      this.selectAlbumDetail,
    )
    return this.albumService.getAlbum('selectOne_album', {
      httpOptions: {
        httpParams: {
          query: graphQLStr
        } as any,
        httpHeaders: {
          'Content-Type': 'application/json'
        }
      }
    }).pipe(
      tap((album) => {
        this.store.dispatch(
          reduceGraph({
            data: album,
            selector: this.selectAlbumDetail
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
      this.selectAlbumsMaster,
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
            selector: this.selectAlbumsMaster
          })
        );
      })
    );
  }

}