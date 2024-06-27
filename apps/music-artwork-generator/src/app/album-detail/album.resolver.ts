import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Album } from '@davidsmith/api-interfaces';
import { Observable, of } from 'rxjs';
import { AlbumRelationshipService } from '../core/album/album-relationship.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumResolver implements Resolve<Album> {
  constructor(private albumRelationshipService: AlbumRelationshipService) { }

  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<Album> {
    return this.albumRelationshipService.getAlbum(route.params.id);
  }
}
