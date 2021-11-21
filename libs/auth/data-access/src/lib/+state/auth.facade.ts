import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthDataAccessModule } from '../auth-data-access.module';

import * as AuthActions from './auth.actions';
import * as AuthSelectors from './auth.selectors';

@Injectable({ providedIn: AuthDataAccessModule })
export class AuthFacade {
  loggingIn$ = this.store.pipe(select(AuthSelectors.getLoggingIn));
  jwt$ = this.store.pipe(select(AuthSelectors.getJwt));
  error$ = this.store.pipe(select(AuthSelectors.getError));

  constructor(private readonly store: Store) {}

  login(username: string, password: string) {
    this.store.dispatch(AuthActions.login({ username, password }));
  }
}
