import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";

import { UserModel } from "../../../../users/domain/models/user.model";

import {
  JwtValidatorPort,
  JwtValidatorPortToken,
} from "../../ports/jwt-validator.port";
import {
  JwtSecretsProviderPort,
  JwtSecretsProviderPortToken,
} from "../../ports/jwt-secrets-provider.port";

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh",
) {
  constructor(
    @Inject(JwtValidatorPortToken)
    private jwtValidatorPort: JwtValidatorPort,
    @Inject(JwtSecretsProviderPortToken)
    jwtSecretsProviderPort: JwtSecretsProviderPort,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecretsProviderPort.getRefreshTokenSecret(),
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    payload: unknown,
    done: (error: Error | null, user: UserModel | null) => void,
  ) {
    try {
      const user = await this.jwtValidatorPort.validateRefreshToken(payload);

      done(null, user);
    } catch (err: unknown) {
      done(new UnauthorizedException(), null);
    }
  }
}
