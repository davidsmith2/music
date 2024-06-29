import { Injectable } from "@angular/core";
import { ArtistService } from "../artist/artist.service";
import { rootEntities, rootEntity } from "ngrx-entity-relationship";
import { toGraphQL } from "ngrx-entity-relationship/graphql";

@Injectable({providedIn: 'root'})
export class ArtistRelationshipService {
  selectArtist = rootEntity(
    this.artistService,
    {
      gqlFields: {
        id: '',
        name: '',
        albums: '{id, title, artist, cover}'
      }
    }
  );

  selectArtists = rootEntities(this.selectArtist);
  
  constructor(
    private artistService: ArtistService
  ) {}
  
  getArtistByKey(key: string) {
    const graphQLStr = toGraphQL(
      'selectOne_artist',
      {id: key},
      this.selectArtist,
    )
    return this.artistService.getArtist('selectOne_artist', {
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