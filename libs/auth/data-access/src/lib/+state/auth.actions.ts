import { JwtPayload } from '@angular-nest/auth/interfaces';
import { createAction, props } from '@ngrx/store';

export const login = createAction('[Auth] Login', props<{ username: string; password: string }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ jwt: string }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: any }>());

export const checkAuthentication = createAction('[Auth] Check Authentication');
export const revokeAuthentication = createAction('[Auth] Revoke Authentication');

export const info = createAction('[Auth] Info', props<{ jwt: string }>());
export const infoSuccess = createAction('[Auth] Info Success', props<{ jwtPayload: JwtPayload }>());
export const infoFailure = createAction('[Auth] Info Failure', props<{ error: any }>());
