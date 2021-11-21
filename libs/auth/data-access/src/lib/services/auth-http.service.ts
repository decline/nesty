import { JwtLoginResponse, JwtPayload } from '@angular-nest/auth/interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthHttpService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<JwtLoginResponse> {
    return this.http.post<JwtLoginResponse>('/api/auth/login', { username, password });
  }

  info(): Observable<JwtPayload> {
    return this.http.get<JwtPayload>('/api/auth/info');
  }
}
