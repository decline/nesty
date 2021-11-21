export interface JwtPayload {
  sub: string;
  username: string;
}

export interface JwtLoginResponse {
  accessToken: string;
}
