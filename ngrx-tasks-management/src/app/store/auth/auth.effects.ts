import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { ActionTypes, CheckAuthSuccess, CheckAuthStart, CheckAuthError } from './auth.actions';
import { catchError, exhaustMap, map, startWith, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
  ) {}

  // noinspection JSUnusedGlobalSymbols
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
}
