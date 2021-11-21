import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map, tap } from 'rxjs';
import { AuthHttpService } from '../services/auth-http.service';

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  private readonly tokenStorageKey = 'auth-token';

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      fetch({
        run: (action) =>
          this.authHttpService
            .login(action.username, action.password)
            .pipe(map((response) => AuthActions.loginSuccess({ jwt: response.accessToken }))),
        onError: (action, error) => {
          console.error('Error', error);
          return AuthActions.loginFailure({ error });
        },
      })
    )
  );

  storeToken$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((action) => localStorage.setItem(this.tokenStorageKey, action.jwt))
      ),
    { dispatch: false }
  );

  checkAuthentication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkAuthentication),
      map(() => localStorage.getItem(this.tokenStorageKey)),
      map((jwt) => {
        if (jwt) {
          return AuthActions.info({ jwt });
        }
        return AuthActions.infoFailure({ error: 'No token found in storage' });
      })
    )
  );

  info$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.info),
      fetch({
        run: () =>
          this.authHttpService.info().pipe(map((response) => AuthActions.infoSuccess({ jwtPayload: response }))),
        onError: (action, error) => {
          console.error('Error', error);
          return AuthActions.infoFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions, private authHttpService: AuthHttpService) {}
}
