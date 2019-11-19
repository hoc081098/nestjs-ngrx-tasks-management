import { Injectable } from '@angular/core';
import { AuthDto, AuthType } from '../model/auth';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static readonly BASE_URL = 'http://localhost:3000/auth/';
  private static readonly USER_KEY = 'user';

  private readonly jwtHelperService = new JwtHelperService();
  private readonly userSubject = new BehaviorSubject<User>(AuthService._getUser());

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  private static _getUser(): User | null {
    const user = localStorage.getItem(AuthService.USER_KEY);
    if (!user) {
      return null;
    }
    try {
      return JSON.parse(user);
    } catch (e) {
      return null;
    }
  }

  auth(authDto: AuthDto, authType: AuthType) {
    return this.httpClient
      .post<any>(AuthService.BASE_URL + authType, authDto)
      .pipe(
        tap(body => {
          if (authType === 'sign_in') {
            const user = body as User;
            localStorage.setItem(AuthService.USER_KEY, JSON.stringify(user));
            this.userSubject.next(user);
          }
        }),
      );
  }

  checkAuth(): Observable<User> {
    return this.httpClient.get<User>(AuthService.BASE_URL);
  }

  getToken(): string {
    const user = AuthService._getUser();
    return user ? user.accessToken : null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    return !this.jwtHelperService.isTokenExpired(token);
  }

  logout() {
    localStorage.removeItem(AuthService.USER_KEY);
    this.userSubject.next(null);
  }

  get user$() {
    return this.userSubject.asObservable();
  }
}
