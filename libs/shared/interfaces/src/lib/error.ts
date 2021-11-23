export interface Error {
  message: string;
  validation?: {
    [key: string]: string;
  };
}
