import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, switchMap, take, throwError } from 'rxjs';
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
      switchMap((enrichedRequest: HttpRequest<unknown>) =>
        next.handle(enrichedRequest).pipe(
          catchError((error) => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
              this.authFacade.revokeAuthentication();
            }
            return throwError(error);
          })
        )
      )
    );
  }
}
