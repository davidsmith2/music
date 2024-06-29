import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Album } from '@davidsmith/api-interfaces';
import { Observable } from 'rxjs';
import { AlbumService } from '../core/album/album.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumResolver implements Resolve<Album> {
  constructor(private albumService: AlbumService) { }

  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<Album> {
    return this.albumService.getAlbum(route.paramMap.get('id'));
  }
}
