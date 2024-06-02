import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Album } from "../core/album/album.interface";
import { Observable } from "rxjs";
import { AlbumService } from "../core/album/album.service";

@Injectable()
export class AlbumResolverService implements Resolve<Array<Album>>{
  constructor(private albumService: AlbumService) {}
  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<Array<Album>> {
    return this.albumService.getAlbumsByArtistName(route.paramMap.get('name'));
  }
}
