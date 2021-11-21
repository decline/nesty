import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap, take } from 'rxjs';
import { AuthFacade } from '../+state/auth.facade';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authFacade: AuthFacade) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authFacade.jwt$.pipe(
      take(1),
      map((jwt) =>
        jwt
          ? request.clone({
              headers: request.headers.set('Authorization', `Bearer ${jwt}`),
            })
          : request
      ),
      switchMap((enrichedRequest: HttpRequest<unknown>) => next.handle(enrichedRequest))
    );
  }
}
