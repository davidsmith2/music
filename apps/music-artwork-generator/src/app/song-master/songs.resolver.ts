import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Song } from '@davidsmith/api-interfaces';
import { Observable, of } from 'rxjs';
import { SongRelationshipService } from '../core/song/song-relationship.service';

@Injectable({
  providedIn: 'root'
})
export class SongsResolver implements Resolve<Array<Song>> {
  constructor(private songRelationshipService: SongRelationshipService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<Song>> {
    return this.songRelationshipService.getAllSongs();
  }
}
