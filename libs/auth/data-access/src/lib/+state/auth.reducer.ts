import { Action, createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface State {
  authenticated?: boolean; // if user is authenticated
  authenticating: boolean; // if authentication is in progress
  jwt?: string;
  error?: string | null; // last known error (if any)
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: State;
}

export const initialState: State = {
  authenticating: false,
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({ ...state, authenticating: true })),
  on(AuthActions.loginSuccess, (state, { jwt }) => ({ ...state, authenticated: true, authenticating: false, jwt })),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, authenticating: false, error })),
  on(AuthActions.info, (state, { jwt }) => ({ ...state, jwt })),
  on(AuthActions.infoSuccess, (state) => ({ ...state, authenticated: true })),
  on(AuthActions.infoFailure, (state) => ({ ...state, authenticated: false })),
  on(AuthActions.revokeAuthentication, (state) => ({ ...state, authenticated: false }))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
