import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Album } from "../album.interface";
import { Observable } from "rxjs";
import { AlbumService } from "../album.service";

@Injectable()
export class AlbumResolverService implements Resolve<Album>{
  constructor(private albumService: AlbumService) {}
  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<Album> {
    return this.albumService.getAlbumByArtistAndAlbum(
      route.queryParamMap.get('artist'),
      route.queryParamMap.get('album')
    );
  }
}
