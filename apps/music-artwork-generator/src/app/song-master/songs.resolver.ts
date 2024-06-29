import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Song } from '@davidsmith/api-interfaces';
import { Observable } from 'rxjs';
import { SongService } from '../core/song/song.service';

@Injectable({
  providedIn: 'root'
})
export class SongsResolver implements Resolve<Array<Song>> {
  constructor(private songService: SongService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<Song>> {
    return this.songService.getSongs();
  }
}
