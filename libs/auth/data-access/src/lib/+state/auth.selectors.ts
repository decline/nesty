import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_FEATURE_KEY, State } from './auth.reducer';

// Lookup the 'Auth' feature state managed by NgRx
export const getState = createFeatureSelector<State>(AUTH_FEATURE_KEY);

export const getLoggingIn = createSelector(getState, (state: State) => state.loggingIn);

export const getJwt = createSelector(getState, (state: State) => state.jwt);

export const getError = createSelector(getState, (state: State) => state.error);
