import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Album } from "@davidsmith/api-interfaces";
import { AlbumService } from "../core/album/album.service";

@Injectable()
export class AlbumsResolverService {
  constructor(private albumService: AlbumService) {}
  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<Array<Album>> {
    return this.albumService.getAlbums();
  }
}
