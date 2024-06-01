import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ArtistService } from "../artist.service";
import { Artist } from "../artist.interface";

@Injectable()
export class AlbumsResolverService implements Resolve<Array<Artist>>{
  constructor(private artistService: ArtistService) { }

  resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<Array<Artist>> {
    return this.artistService.getArtists();
  }
}
