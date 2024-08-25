import { Component, NgZone } from "@angular/core";
import { APPLE_CLIENT_ID, APPLE_REDIRECT_URI } from "./login.constants";
import { HttpClient } from "@angular/common/http";
import { concatMap, defer, from, iif, Observable, take } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    window.electron.ipcRenderer.on('login-callback', (_event, query) => {
      const accessToken: string = query.access_token;
      const refreshToken: string = query.refresh_token;
      const userEmail: string = query.user_email;
      if (accessToken && refreshToken && userEmail) {
        window.localStorage.setItem('AUTH_ACCESS_TOKEN', accessToken);
        window.localStorage.setItem('AUTH_REFRESH_TOKEN', refreshToken);
        window.localStorage.setItem('AUTH_USER_EMAIL', userEmail);
      }
      const isNewUser: boolean = query.is_new_user === 'true';
      const userFirstName: string = query.user_first_name;
      const userLastName: string = query.user_last_name;
      const persistenceHandler$: Observable<any> = this.httpClient.post('https://local.music.davidsmithweb.com:3333/api/user', {
        firstName: userFirstName,
        lastName: userLastName,
        username: userEmail
      }).pipe(take(1));
      const navigationHandler$: Observable<any> = defer(() => {
        return from(this.ngZone.run(() => this.router.navigate(['/test'])));
      });
      return iif(
        () => isNewUser,
        persistenceHandler$.pipe(
          concatMap(() => navigationHandler$)
        ),
        navigationHandler$
      ).pipe(take(1)).subscribe();
    });
  }

  login(event: Event) {
    event.preventDefault();
    const clientId = APPLE_CLIENT_ID;
    const redirectUri = APPLE_REDIRECT_URI;
    const responseType = 'code id_token';
    const responseMode = 'form_post';
    const scope = 'name email';
    const baseUrl = 'https://appleid.apple.com/auth/authorize';
    const fullUrl = `${baseUrl}?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${responseType}&response_mode=${responseMode}&scope=${scope}`;
    window.electron.shell.openExternal(fullUrl);
  }
}