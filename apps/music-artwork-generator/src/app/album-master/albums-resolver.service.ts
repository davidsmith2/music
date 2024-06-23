import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Album } from "@davidsmith/api-interfaces";
import { AlbumService } from "../core/album/album.service";
import { AlbumRelationshipService } from "../core/album/album-relationship.service";

@Injectable()
export class AlbumsResolverService {
  constructor(private albumRelationshipService: AlbumRelationshipService) {}
  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<Array<Album>> {
    return this.albumRelationshipService.getAllAlbums();
  }
}
