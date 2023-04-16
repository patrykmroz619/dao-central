export enum JWTType {
  ACCESS_TOKEN = "ACCESS_TOKEN",
  REFRESH_TOKEN = "REFRESH_TOKEN",
}

export interface JWTCustomPayload {
  walletAddress: string;
  code: string;
}

export interface JWTPayload extends JWTCustomPayload {
  iss: string;
  aud: string;
  jti: string;
  sub: string;
  exp: string;
}

export type JWTToken = string;

export interface JWTTokens {
  accessToken: JWTToken;
  accessTokenExpiry: Date;
  refreshToken: JWTToken;
}
