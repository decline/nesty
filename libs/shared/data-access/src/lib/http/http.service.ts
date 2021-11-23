import {
  HttpClient as AngularHttpClient,
  HttpContext as AngularHttpContext,
  HttpHeaders as AngularHttpHeaders,
  HttpParams as AngularHttpParams,
  HttpResponse as AngularHttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpResponse, HttpResponseBody } from '@nesty/shared/interfaces';
import { map, Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

interface Options {
  headers?: AngularHttpHeaders;
  context?: AngularHttpContext;
  params?: AngularHttpParams;
}

interface OptionsDelete {
  body?: unknown | null;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: AngularHttpClient) {}

  /**
   * Performs a GET request against the given endpoint and returns a HttpResponse<T> for the given type
   */
  public get<T>(endpoint: string, options?: Options, retries: number = 0): Observable<HttpResponse<T | null>> {
    return this.handleRequest(
      this.http.get<HttpResponseBody<T>>(endpoint, { ...options, observe: 'response' }),
      retries
    );
  }

  /**
   * Performs a POST request against the given endpoint and returns a HttpResponse<T> for the given type
   */
  public post<T>(
    endpoint: string,
    body: unknown | null,
    options?: Options,
    retries: number = 0
  ): Observable<HttpResponse<T | null>> {
    return this.handleRequest(
      this.http.post<HttpResponseBody<T>>(endpoint, body, { ...options, observe: 'response' }),
      retries
    );
  }

  /**
   * Performs a PUT request against the given endpoint and returns a HttpResponse<T> for the given type
   */
  public put<T>(
    endpoint: string,
    body: unknown | null,
    options?: Options,
    retries: number = 0
  ): Observable<HttpResponse<T | null>> {
    return this.handleRequest(
      this.http.put<HttpResponseBody<T>>(endpoint, body, { ...options, observe: 'response' }),
      retries
    );
  }

  /**
   * Performs a PATCH request against the given endpoint and returns a HttpResponse<T> for the given type
   */
  public patch<T>(
    endpoint: string,
    body: unknown | null,
    options?: Options,
    retries: number = 0
  ): Observable<HttpResponse<T | null>> {
    return this.handleRequest(
      this.http.patch<HttpResponseBody<T>>(endpoint, body, { ...options, observe: 'response' }),
      retries
    );
  }

  /**
   * Performs a DELETE request against the given endpoint and returns an empty result
   */
  public delete<T>(
    endpoint: string,
    options?: Options & OptionsDelete,
    retries: number = 0
  ): Observable<HttpResponse<T | null>> {
    return this.handleRequest(
      this.http.delete<HttpResponseBody<T>>(endpoint, { ...options, observe: 'response' }),
      retries
    );
  }

  /**
   * Performs retry and error handling for requests
   */
  private handleRequest<T>(
    request: Observable<AngularHttpResponse<HttpResponseBody<T>>>,
    retries: number
  ): Observable<HttpResponse<T | null>> {
    return request.pipe(
      retry(retries),
      map(
        (response) =>
          <HttpResponse<T>>{
            ...response,
          }
      )
    );
  }
}
