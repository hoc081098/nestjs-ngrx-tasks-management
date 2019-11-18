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
  LoginUserError, LogoutSuccess, LogoutError
} from './auth.actions';
import { catchError, exhaustMap, map, startWith, switchMap, tap } from 'rxjs/operators';
import { defer, of } from 'rxjs';
import { User } from '../../model/user';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

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
      ofType(ActionTypes.LOGIN_USER_ERROR),
      tap(() => this.snackBar.open('Login error', undefined, { duration: 2000 })),
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
}
