import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService as NestJwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as crypto from "crypto";
import { Request } from "express";
import * as dayjs from "dayjs";

import { UserEntity } from "src/modules/users/users.entity";
import { JWTEntity } from "./jwt.entity";
import {
  JWTCustomPayload,
  JWTPayload,
  JWTTokens,
  JWTType,
} from "./jwt.interfaces";
import { UsersService } from "src/modules/users/users.service";
import { CONFIG } from "src/constants";

@Injectable()
export class JWTService {
  constructor(
    @InjectRepository(JWTEntity)
    private jwtRepository: Repository<JWTEntity>,
    private nestJwtService: NestJwtService,
    private configService: ConfigService,
    private usersService: UsersService,
  ) {}

  public async getNewJWTTokens(
    user: UserEntity,
    ip: string,
  ): Promise<JWTTokens> {
    await this.jwtRepository.update(
      { user: { id: user.id } },
      { active: false },
    );

    const accessTokenCode = crypto.randomBytes(32).toString("hex");

    const newAccessToken = await this.jwtRepository.save({
      user,
      code: accessTokenCode,
      type: JWTType.ACCESS_TOKEN,
    });

    const accessTokenPayload: JWTCustomPayload = {
      walletAddress: user.walletAddress.toLowerCase(),
      code: accessTokenCode,
      ip,
    };

    const refreshTokenCode = crypto.randomBytes(32).toString("hex");

    const newRefreshToken = await this.jwtRepository.save({
      user,
      code: refreshTokenCode,
      type: JWTType.REFRESH_TOKEN,
    });

    const refreshTokenPayload: JWTCustomPayload = {
      walletAddress: user.walletAddress.toLowerCase(),
      code: refreshTokenCode,
      ip,
    };

    const accessTokenExpiry = dayjs().add(
      this.configService.get<number>(CONFIG.JWT_ACCESS_TOKEN_EXP),
      "seconds",
    );

    return {
      accessToken: this.nestJwtService.sign(accessTokenPayload, {
        expiresIn: this.configService.get<number>(CONFIG.JWT_ACCESS_TOKEN_EXP),
        subject: user.id,
        secret: this.configService.get<string>(CONFIG.JWT_ACCESS_TOKEN_SECRET),
        jwtid: String(newAccessToken.id),
        issuer: this.configService.get<string>(CONFIG.APP_BACKEND_URL),
        audience: this.configService.get<string>(CONFIG.APP_FRONTEND_URL),
      }),
      accessTokenExpiry: accessTokenExpiry.toDate(),
      refreshToken: this.nestJwtService.sign(refreshTokenPayload, {
        expiresIn: this.configService.get<string>(CONFIG.JWT_REFRESH_TOKEN_EXP),
        subject: user.id,
        secret: this.configService.get<string>(CONFIG.JWT_REFRESH_TOKEN_SECRET),
        jwtid: String(newRefreshToken.id),
        issuer: this.configService.get<string>(CONFIG.APP_BACKEND_URL),
        audience: this.configService.get<string>(CONFIG.APP_FRONTEND_URL),
      }),
    };
  }

  public async validateToken(
    req: Request,
    payload: unknown,
    jwtType: JWTType,
  ): Promise<UserEntity> {
    console.log({ payload });
    if (!this.isValidJwtPayload(payload)) {
      throw new UnauthorizedException();
    }

    if (
      payload.aud !== this.configService.get<string>(CONFIG.APP_FRONTEND_URL) ||
      payload.iss !== this.configService.get<string>(CONFIG.APP_BACKEND_URL)
    ) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.getUser(payload.walletAddress);

    if (!user) {
      throw new UnauthorizedException();
    }

    const token = await this.jwtRepository.findOne({
      where: {
        id: Number(payload.jti),
        code: payload.code,
        active: true,
        type: jwtType,
        user: { id: user.id },
      },
    });

    if (!token) {
      throw new UnauthorizedException();
    }

    await this.jwtRepository.update(token.id, { lastUsed: new Date() });

    return user;
  }

  public async removeJwtTokens(user: UserEntity): Promise<void> {
    await this.jwtRepository.delete({ user: { id: user.id } });
  }

  private isValidJwtPayload(payload: any): payload is JWTPayload {
    if (
      !payload?.aud ||
      !payload?.iss ||
      !payload?.jti ||
      !payload?.sub ||
      !payload?.ip ||
      !payload?.code ||
      !payload?.ip
    ) {
      return false;
    }

    return true;
  }
}
