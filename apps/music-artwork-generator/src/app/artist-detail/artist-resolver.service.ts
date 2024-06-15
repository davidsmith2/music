import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Artist } from "@davidsmith/api-interfaces";
import { ArtistService } from "../core/artist/artist.service";
import { map } from "rxjs/operators";

@Injectable()
export class ArtistResolverService implements Resolve<Array<Artist>>{
  constructor(private artistService: ArtistService) {}
  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<Array<Artist>> {
    const id: string = route.paramMap.get('name');
    if (id === 'All Artists') {
      return this.artistService.getArtists();
    } else {
      return this.artistService.getArtistByName(id).pipe(
        map((artist: Artist) => [artist])
      );
    }
  }
}
