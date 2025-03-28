import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  AuthenticationTokenDTO,
  AuthenticationTokenRequestDTO,
} from '../models';
import { map, Observable, of, take } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { API } from '../../API/api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly cookies = inject(CookieService);

  signIn(user: AuthenticationTokenRequestDTO) {
    console.log('Sign in');
    this.http
      .post(API + '/Authentication', user)
      .pipe(take(1))
      .subscribe({
        next: (res: AuthenticationTokenDTO) => {
          console.log(res);
          const token = JSON.stringify(res);

          if (token) {
            this.setCookies(res);
            this.router.navigate(['/main']);
          } else {
            console.log('Token not found');
          }
        },
        error: (error) => {
          console.log('Subscription error:', error);
        },
      });
  }

  setCookies(token: AuthenticationTokenDTO) {
    const tokenString = JSON.stringify(token);
    this.cookies.set('token', tokenString);
  }

  signOut() {
    this.cookies.delete('token');
    this.router.navigate(['/sign-in']);
  }

  isAuthenticated(): Observable<boolean> {
    const token = this.cookies.check('token');

    if (!token) {
      this.router.navigate(['/sign-in']);
      return of(false);
    }
    return this.http.get(API + '/Authentication/identityInfo').pipe(
      map((res) => {
        return res as boolean;
      })
    );
  }

  getToken() {
    const cookie = this.cookies.get('token');
    if (!cookie) {
      return null;
    }

    const token: AuthenticationTokenDTO = JSON.parse(cookie);
    return token;
  }

  getAccessToken() {
    const token = this.getToken();
    return token?.accessToken;
  }
}
