import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Artist } from "@davidsmith/api-interfaces";
import { ArtistRelationshipService } from "../core/artist/artist-relationship.service";

@Injectable()
export class ArtistResolverService {
  constructor(private artistRelationshipService: ArtistRelationshipService) {}
  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<Artist> {
    const id: string = route.paramMap.get('id');
    return this.artistRelationshipService.getArtistByKey(id);
  }
}
