import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy } from "passport-jwt";
import { Request } from "express";

import { UserEntity } from "src/modules/users/users.entity";
import { JWTService } from "./jwt/jwt.service";
import { JWTType } from "./jwt/jwt.interfaces";
import { CONFIG } from "src/constants";

const cookieExtractor = (req: Request) => req?.cookies?.accessToken ?? null;

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(
  Strategy,
  "jwt-access",
) {
  constructor(
    private jwtService: JWTService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(CONFIG.JWT_ACCESS_TOKEN_SECRET),
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
        JWTType.ACCESS_TOKEN,
      );

      done(null, user);
    } catch (err: unknown) {
      done(new UnauthorizedException(), null);
    }
  }
}
