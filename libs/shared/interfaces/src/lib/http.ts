export interface HttpResponseError {
  message: string;
  validation?: {
    [key: string]: string;
  };
}
