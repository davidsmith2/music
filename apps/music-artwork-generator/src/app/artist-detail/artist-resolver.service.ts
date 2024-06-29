import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Artist } from "@davidsmith/api-interfaces";
import { ArtistService } from "../core/artist/artist.service";

@Injectable()
export class ArtistResolverService {
  constructor(private artistService: ArtistService) {}
  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<Artist> {
    const id: string = route.paramMap.get('id');
    return this.artistService.getArtist();
  }
}
