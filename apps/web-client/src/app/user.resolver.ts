import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserService } from './core/user/user.service';
import { UserDto } from '@music/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<UserDto> {
  constructor(private userService: UserService) {}
  resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<UserDto> {
    const username: string = localStorage.getItem('AUTH_USER_EMAIL');
    return this.userService.getUserByUsername(username);
  }
}
