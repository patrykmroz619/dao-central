import { Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CONFIG } from "src/constants";

import { JwtSecretsProviderPort } from "../../domain/ports/jwt-secrets-provider.port";

export class JwtSecretsProvider implements JwtSecretsProviderPort {
  constructor(
    @Inject(ConfigService)
    private configService: ConfigService,
  ) {}

  public getAccessTokenSecret(): string {
    return this.configService.get<string>(CONFIG.JWT_ACCESS_TOKEN_SECRET);
  }

  public getRefreshTokenSecret(): string {
    return this.configService.get<string>(CONFIG.JWT_REFRESH_TOKEN_SECRET);
  }
}
