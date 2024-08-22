import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<boolean> {
  constructor(private httpClient: HttpClient) {}
  resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<boolean> {
    const username: string = localStorage.getItem('AUTH_USER_EMAIL');
    return this.httpClient.get<any>(`https://local.music.davidsmithweb.com:3333/api/user?username=${username}`);
  }
}
