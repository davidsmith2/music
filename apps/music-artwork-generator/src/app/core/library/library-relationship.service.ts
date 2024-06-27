import { Injectable } from "@angular/core";
import { LibraryService } from "./library.service";
import { ArtistService } from "../artist/artist.service";
import { reduceGraph, relatedEntity, rootEntity } from "ngrx-entity-relationship";
import { toGraphQL, toQuery } from "ngrx-entity-relationship/graphql";
import { tap } from "rxjs";
import { Store } from "@ngrx/store";

@Injectable({providedIn: 'root'})
export class LibraryRelationshipService {
  selectLibrary = rootEntity(
    this.libraryService,
    {
      gqlFields: {
        id: '',
        artistIds: '',
        artists: '{id, name}'
      }
    },
    relatedEntity(
      this.artistService,
      'artistIds',
      'artists',
      { gqlFields: ['id', 'name']}
    )
  );

  constructor(
    private libraryService: LibraryService,
    private artistService: ArtistService,
    private store: Store
  ) {}

  getLibraryByKey(key: string) {
    const graphQLStr = toGraphQL(
      'selectOne_library',
      {id: key},
      this.selectLibrary,
    )
    const queryStr = toQuery(graphQLStr);
    return this.libraryService.getLibrary('selectOne_library', {
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
            selector: this.selectLibrary
          })
        );

      })
    );
  }

}
