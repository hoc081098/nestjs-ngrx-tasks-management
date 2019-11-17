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
  LoginUserError
} from './auth.actions';
import { catchError, exhaustMap, map, startWith, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from '../../model/user';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}

  checkAuthEffect = createEffect(() =>
    this.actions$.pipe(
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
    )
  );

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
    }
  );

  loginSuccessEffect = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionTypes.LOGIN_USER_SUCCESS),
      tap(() => this.router.navigate(['/tasks'])),
    );
  }, { dispatch: false });
}
