import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponse, AuthTokens, AuthUser } from './auth.interfaces';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @Post('redirect')
  async handleRedirect(
    @Body() authResponse: AuthResponse,
    @Res() res: Response
  ): Promise<void> {
    console.log('received auth response:', authResponse);
    let isNewUser: boolean;
    let userEmail: string;
    let userFirstName: string;
    let userLastName: string;
    if (authResponse.user) {
      console.log('new user flow');
      const user: AuthUser = JSON.parse(authResponse.user);
      isNewUser = true;
      userEmail = user.email;
      userFirstName = user.name.firstName;
      userLastName = user.name.lastName;
    } else {
      console.log('existing user flow');
      isNewUser = false;
      userEmail = await this.authService.getUserEmail(authResponse.id_token);
    }
    const authTokens: AuthTokens = await this.authService.getAuthTokens(authResponse.code);
    const urlSearchParams: URLSearchParams = new URLSearchParams();
    if (isNewUser) {
      urlSearchParams.set('user_first_name', userFirstName);
      urlSearchParams.set('user_last_name', userLastName);
    }
    urlSearchParams.set('user_email', userEmail);
    urlSearchParams.set('access_token', authTokens.access_token);
    urlSearchParams.set('refresh_token', authTokens.refresh_token);
    urlSearchParams.set('is_new_user', isNewUser.toString());
    const returnURL: string = authResponse.state;
    const redirectURL: string = `${returnURL}?${urlSearchParams.toString()}`;
    console.log('redirecting to URL', redirectURL);
    res.redirect(redirectURL);
  }
  
}