import { Injectable } from "@angular/core";
import { LibraryService } from "./library.service";
import { rootEntity } from "ngrx-entity-relationship";
import { toGraphQL } from "ngrx-entity-relationship/graphql";

@Injectable({providedIn: 'root'})
export class LibraryRelationshipService {
  selectLibrary = rootEntity(
    this.libraryService,
    {
      gqlFields: {
        id: '',
        artists: '{id, name}'
      }
    }
  );

  constructor(
    private libraryService: LibraryService
  ) {}

  getLibraryByKey(key: string) {
    const graphQLStr = toGraphQL(
      'selectOne_library',
      {id: key},
      this.selectLibrary,
    )
    return this.libraryService.getLibrary('selectOne_library', {
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
