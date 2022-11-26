import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy } from "passport-jwt";
import { Request } from "express";

import { UserEntity } from "src/modules/users/users.entity";
import { JWTService } from "./jwt/jwt.service";
import { JWTType } from "./jwt/jwt.interfaces";
import { CONFIG } from "src/constants";

const cookieExtractor = (req: Request) => req?.cookies?.refreshToken ?? null;

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh",
) {
  constructor(private jwtService: JWTService, configService: ConfigService) {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(CONFIG.JWT_REFRESH_TOKEN_SECRET),
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    payload: unknown,
    done: (error: Error | null, user: UserEntity | null) => void,
  ) {
    try {
      const user = await this.jwtService.validateToken(
        req,
        payload,
        JWTType.REFRESH_TOKEN,
      );

      done(null, user);
    } catch (err: unknown) {
      done(new UnauthorizedException(), null);
    }
  }
}
