export interface HttpResponse<T> {
  body: HttpResponseBody<T>;
  status: number;
  statusText: string;
}

export interface HttpResponseBody<T> {
  data?: T | null;
  count: unknown;
}

export interface HttpResponseError {
  message: string;
  validation?: {
    [key: string]: string;
  };
}
