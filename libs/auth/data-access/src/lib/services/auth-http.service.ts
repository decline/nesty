import { JwtLoginResponse } from '@nesty/auth/interfaces';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HANDLE_AUTHENTICATION_FAILURE } from '../interceptor/auth.interceptor';

@Injectable({
  providedIn: 'root',
})
export class AuthHttpService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<JwtLoginResponse> {
    return this.http.post<JwtLoginResponse>(
      '/api/auth/login',
      { username, password },
      { context: new HttpContext().set(HANDLE_AUTHENTICATION_FAILURE, false) }
    );
  }

  info(): Observable<unknown> {
    return this.http.get<unknown>('/api/auth/info');
  }
}
