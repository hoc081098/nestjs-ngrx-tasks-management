import { Injectable } from '@angular/core';
import { AuthDto, AuthType } from '../model/auth';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static BASE_URL = 'http://localhost:3000/auth/';

  constructor(private httpClient: HttpClient) {}

  auth(authDto: AuthDto, authType: AuthType) {
    return this.httpClient
      .post<any>(AuthService.BASE_URL + authType, authDto)
      .pipe(
        tap(body => {
          if (authType === 'sign_in') {
            localStorage.setItem('token', body.accessToken);
          }
        }),
      );
  }

  checkAuth(): Observable<User> {
    return this.httpClient.get<User>(AuthService.BASE_URL);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  removeToken() {
    return localStorage.removeItem('token');
  }
}
