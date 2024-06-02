import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Album } from "../core/album/album.interface";
import { Observable } from "rxjs";
import { AlbumService } from "../core/album/album.service";
import { Artist } from "../core/artist/artist.interface";
import { ArtistService } from "../core/artist/artist.service";

@Injectable()
export class ArtistResolverService implements Resolve<Artist>{
  constructor(private artistService: ArtistService) {}
  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<Artist> {
    return this.artistService.getArtistByName(route.paramMap.get('name'));
  }
}
