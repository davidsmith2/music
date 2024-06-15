import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Artist } from "@davidsmith/api-interfaces";
import { ArtistService } from "../core/artist/artist.service";

@Injectable()
export class ArtistResolverService implements Resolve<Artist>{
  constructor(private artistService: ArtistService) {}
  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<Artist> {
    return this.artistService.getArtistByName(route.paramMap.get('name'));
  }
}
