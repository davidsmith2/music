import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ArtistService } from "../core/artist/artist.service";
import { Artist } from "@davidsmith/api-interfaces";

@Injectable()
export class ArtistsResolverService {
  constructor(private artistService: ArtistService) {}
  resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<Array<Artist>> {
    return this.artistService.getArtists();
  }
}
