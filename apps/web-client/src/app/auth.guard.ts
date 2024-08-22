import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Promise<boolean> {
    if (route.routeConfig.path === 'login') {
      return this.handleAuthenticatedRoute();
    } else {
      return this.handleUnauthenticatedRoute();
    }
  }

  private handleAuthenticatedRoute(): Promise<boolean> {
    if (
      localStorage.getItem('AUTH_ACCESS_TOKEN') === null &&
      localStorage.getItem('AUTH_REFRESH_TOKEN') === null &&
      localStorage.getItem('AUTH_USER_EMAIL') === null
    ) {
      return Promise.resolve(true);
    } else {
      return this.router.navigate(['/library']).then(() => false);
    }

  }

  private handleUnauthenticatedRoute(): Promise<boolean> {
    if (
      localStorage.getItem('AUTH_ACCESS_TOKEN') !== null &&
      localStorage.getItem('AUTH_REFRESH_TOKEN') !== null &&
      localStorage.getItem('AUTH_USER_EMAIL') !== null
    ) {
      return Promise.resolve(true);
    } else {
      return this.router.navigate(['/login']).then(() => false);
    }
  }

}
