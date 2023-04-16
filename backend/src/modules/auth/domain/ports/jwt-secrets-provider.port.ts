export const JwtSecretsProviderPortToken = "JWT_SECRETS_PROVIDER_PORT_TOKEN";

export interface JwtSecretsProviderPort {
  getAccessTokenSecret(): string;

  getRefreshTokenSecret(): string;
}
