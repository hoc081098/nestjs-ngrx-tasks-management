import { Injectable } from '@angular/core';
import { AuthDto, AuthType } from '../model/auth';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static readonly BASE_URL = 'http://localhost:3000/auth/';
  private readonly jwtHelperService = new JwtHelperService();

  constructor(
    private httpClient: HttpClient,
  ) { }

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

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    return !this.jwtHelperService.isTokenExpired(token);
  }

  logout() {
    this.removeToken();
  }
}
