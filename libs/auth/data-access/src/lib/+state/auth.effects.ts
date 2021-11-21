import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs';
import { AuthHttpService } from '../services/auth-http.service';

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
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

  constructor(private readonly actions$: Actions, private authHttpService: AuthHttpService) {}
}
