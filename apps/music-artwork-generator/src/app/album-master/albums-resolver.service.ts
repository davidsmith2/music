import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Album } from "../album.interface";
import { Observable, of } from "rxjs";
import { AlbumService } from "../album.service";

@Injectable()
export class AlbumsResolverService implements Resolve<Array<Album>>{
  constructor(private albumService: AlbumService) { }

  resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<Array<Album>> {
    return this.albumService.getAlbums();
  }
}
