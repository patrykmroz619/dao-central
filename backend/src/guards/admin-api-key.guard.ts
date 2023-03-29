import { CanActivate, ExecutionContext, Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Observable } from "rxjs";

import { CONFIG, CUSTOM_HEADERS } from "src/constants";

export class AdminApiKeyGuard implements CanActivate {
  constructor(
    @Inject(ConfigService)
    private configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const headerApiKey =
      request.headers[CUSTOM_HEADERS.ADMIN_API_KEY] ||
      request.headers[CUSTOM_HEADERS.ADMIN_API_KEY.toLocaleLowerCase()];

    const correctApiKey = this.configService.get<string>(CONFIG.ADMIN_API_KEY);

    return headerApiKey === correctApiKey;
  }
}
