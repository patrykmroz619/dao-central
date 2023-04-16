import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as crypto from "crypto";
import * as dayjs from "dayjs";
import { JwtService as NestJwtService } from "@nestjs/jwt";

import { CONFIG } from "src/constants";
import { UsersService } from "src/modules/users/presentation/services/users.service";
import { JwtTokensModel } from "../../domain/model/jwt-tokens.model";
import { JwtTokensRepositoryPort } from "../../domain/ports/jwt-tokens.repository.port";
import {
  JWTCustomPayload,
  JWTType,
} from "../../domain/interfaces/jwt.interfaces";
import { JWTEntity } from "../entities/jwt.entity";

@Injectable()
export class JwtTokensRepository implements JwtTokensRepositoryPort {
  constructor(
    @InjectRepository(JWTEntity)
    private jwtRepository: Repository<JWTEntity>,
    private nestJwtService: NestJwtService,
    private configService: ConfigService,
    private usersService: UsersService,
  ) {}

  public async createJWTTokensForUser(userId: string): Promise<JwtTokensModel> {
    const user = await this.usersService.findById(userId);

    await this.jwtRepository.update({ user }, { active: false });

    const accessTokenCode = crypto.randomBytes(32).toString("hex");

    const newAccessToken = await this.jwtRepository.save({
      user,
      code: accessTokenCode,
      type: JWTType.ACCESS_TOKEN,
    });

    const accessTokenPayload: JWTCustomPayload = {
      walletAddress: user.walletAddress.toLowerCase(),
      code: accessTokenCode,
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
    };

    const accessTokenExpiry = dayjs().add(
      this.configService.get<number>(CONFIG.JWT_ACCESS_TOKEN_EXP),
      "seconds",
    );

    const jwt = {
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

    const jwtTokensModel = new JwtTokensModel(
      jwt.accessToken,
      jwt.refreshToken,
      jwt.accessTokenExpiry,
    );

    return jwtTokensModel;
  }

  public async removeJWTTokensForUser(userId: string): Promise<void> {
    await this.jwtRepository.delete({ user: { id: userId } });
  }
}
