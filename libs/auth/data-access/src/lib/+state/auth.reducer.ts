import { Action, createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface State {
  loggingIn: boolean; // if currently logging in
  jwt?: string;
  error?: string | null; // last known error (if any)
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: State;
}

export const initialState: State = {
  loggingIn: false,
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({ ...state, loggingIn: true })),
  on(AuthActions.loginSuccess, (state, { jwt }) => ({ ...state, loggingIn: false, jwt })),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, loggingIn: false, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
