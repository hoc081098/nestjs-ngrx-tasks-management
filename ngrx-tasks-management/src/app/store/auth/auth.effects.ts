import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import {
  ActionTypes,
  CheckAuthSuccess,
  CheckAuthStart,
  CheckAuthError,
  LoginUser,
  LoginUserSuccess,
  LoginUserStart,
  LoginUserError,
  LogoutSuccess,
  LogoutError,
  AuthStateChanged,
  RegisterUser,
  RegisterUserStart,
  RegisterUserSuccess,
  RegisterUserError
} from './auth.actions';
import { catchError, exhaustMap, map, startWith, switchMap, tap } from 'rxjs/operators';
import { defer, of } from 'rxjs';
import { User } from '../../model/user';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { getErrorMessage } from '../../shared/util';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
  }

  /**
   * CHECK_AUTH
   */
  checkAuthEffect = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionTypes.CHECK_AUTH),
      exhaustMap(() =>
        this.authService
          .checkAuth()
          .pipe(
            map(user => new CheckAuthSuccess(user)),
            startWith(new CheckAuthStart()),
            catchError(error => of(new CheckAuthError(error)))
          )
      ),
    );
  });

  /**
   * LOGIN_USER
   */
  loginEffect = createEffect(() => {
    return this.actions$.pipe(
      ofType<LoginUser>(ActionTypes.LOGIN_USER),
      switchMap(action => {
        return this.authService
          .auth(action.payload, 'sign_in')
          .pipe(
            map((user: User) => new LoginUserSuccess(user)),
            startWith(new LoginUserStart()),
            catchError(error => of(new LoginUserError(error))),
          );
      })
    );
  });

  loginSuccessEffect = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionTypes.LOGIN_USER_SUCCESS),
      tap(() => this.snackBar.open('Login success', undefined, { duration: 2000 })),
      tap(() => this.router.navigate(['/tasks'])),
    );
  }, { dispatch: false });

  loginErrorEffect = createEffect(() => {
    return this.actions$.pipe(
      ofType<LoginUserError>(ActionTypes.LOGIN_USER_ERROR),
      tap((action) => this.snackBar.open('Login error: ' + getErrorMessage(action.payload), undefined, { duration: 2000 })),
    );
  }, { dispatch: false });

  /**
   * LOGOUT
   */
  logoutEffect = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionTypes.LOGOUT),
      exhaustMap(() =>
        defer(() => of(this.authService.logout()))
          .pipe(
            map(() => new LogoutSuccess()),
            catchError(error => of(new LogoutError(error))),
          )
      ),
    );
  });

  logoutSuccessEffect = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionTypes.LOGOUT_SUCCESS),
      tap(() => this.snackBar.open('Logout success', undefined, { duration: 2000 })),
      tap(() => this.router.navigate(['/login'])),
    );
  }, { dispatch: false });

  logoutErrorEffect = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionTypes.LOGOUT_ERROR),
      tap(() => this.snackBar.open('Logout error', undefined, { duration: 2000 })),
    );
  }, { dispatch: false });

  /**
   * LISTEN_AUTH_STATE
   */
  listenAuthStateEffect = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionTypes.LISTEN_AUTH_STATE),
      exhaustMap(() =>
        this.authService
          .user$
          .pipe(map(user => new AuthStateChanged(user))),
      ),
    );
  });

  /**
   * REGISTER_USER
   */
  registerUserEffect = createEffect(() => {
    return this.actions$.pipe(
      ofType<RegisterUser>(ActionTypes.REGISTER_USER),
      map(action => action.payload),
      exhaustMap(authDto => {
        return this
          .authService
          .auth(authDto, 'sign_up')
          .pipe(
            map(() => new RegisterUserSuccess()),
            startWith(new RegisterUserStart()),
            catchError(error => of(new RegisterUserError(error))),
          );
      }),
    );
  });

  registerUserSuccessEffect = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionTypes.REGISTER_USER_SUCCESS),
      tap(() => this.snackBar.open('Register user successfully', undefined, { duration: 2000 })),
    );
  }, { dispatch: false });

  registerUserErrorEffect = createEffect(() => {
    return this.actions$.pipe(
      ofType<RegisterUserError>(ActionTypes.REGISTER_USER_ERROR),
      map(action => action.payload),
      tap(error => this.snackBar.open('Register user error: ' + getErrorMessage(error), undefined, { duration: 2000 })),
    );
  }, { dispatch: false });
}
