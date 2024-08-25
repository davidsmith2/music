import { Component, OnDestroy, OnInit } from "@angular/core";
import { APPLE_CLIENT_ID, APPLE_REDIRECT_URI } from "./login.constants";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { defer, from, iif, Observable, Subscription } from "rxjs";
import { tap, take, switchMap, concatMap } from "rxjs/operators";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit, OnDestroy {
  private postLogin$: Observable<any>;
  private postLoginSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient
  ) {
    this.postLogin$ = this.activatedRoute.queryParamMap.pipe(
      tap((paramMap: ParamMap) => {
        const accessToken: string = paramMap.get('access_token');
        const refreshToken: string = paramMap.get('refresh_token');
        const userEmail: string = paramMap.get('user_email');
        if (accessToken && refreshToken && userEmail) {
          window.localStorage.setItem('AUTH_ACCESS_TOKEN', accessToken);
          window.localStorage.setItem('AUTH_REFRESH_TOKEN', refreshToken);
          window.localStorage.setItem('AUTH_USER_EMAIL', userEmail);
        }
      }),
      switchMap((paramMap: ParamMap) => {
        const isNewUser: boolean = paramMap.get('is_new_user') === 'true';
        const userEmail: string = paramMap.get('user_email');
        const userFirstName: string = paramMap.get('user_first_name');
        const userLastName: string = paramMap.get('user_last_name');
        const persistenceHandler$: Observable<any> = this.httpClient.post('https://local.music.davidsmithweb.com:3333/api/user', {
          firstName: userFirstName,
          lastName: userLastName,
          username: userEmail
        }).pipe(take(1));
        const navigationHandler$: Observable<any> = defer(() => {
          return from(this.router.navigate(['/'], { queryParams: null }));
        });
        return iif(
          () => isNewUser,
          persistenceHandler$.pipe(
            concatMap(() => navigationHandler$)
          ),
          navigationHandler$
        );
      })
    );
  }

  ngOnInit(): void {
    this.postLoginSubscription = this.postLogin$.subscribe();
  }

  ngOnDestroy(): void {
    if (this.postLoginSubscription) {
      this.postLoginSubscription.unsubscribe();
    }
  }

  login(event: Event) {
    event.preventDefault();
    const clientId = APPLE_CLIENT_ID;
    const redirectUri = APPLE_REDIRECT_URI;
    const responseType = 'code id_token';
    const responseMode = 'form_post';
    const scope = 'name email';
    const state = 'https://local.music.davidsmithweb.com:4200/login';
    const baseUrl = 'https://appleid.apple.com/auth/authorize';
    const fullUrl = `${baseUrl}?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${responseType}&response_mode=${responseMode}&scope=${scope}&state=${state}`;
    window.location.href = fullUrl;
  }
}