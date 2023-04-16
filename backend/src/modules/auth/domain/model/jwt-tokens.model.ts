export class JwtTokensModel {
  constructor(
    public accessToken: string,
    public refreshToken: string,
    public accessTokenExpiry: Date,
  ) {}
}
