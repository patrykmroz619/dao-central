import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { CONFIG } from "src/constants";
import { UserModel } from "src/modules/users/domain/models/user.model";
import { UsersService } from "src/modules/users/presentation/services/users.service";
import { Repository } from "typeorm";
import { JwtValidatorPort } from "../../domain/ports/jwt-validator.port";
import { JWTPayload, JWTType } from "../../domain/interfaces/jwt.interfaces";
import { JWTEntity } from "../entities/jwt.entity";

@Injectable()
export class JwtValidator implements JwtValidatorPort {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    @InjectRepository(JWTEntity)
    private jwtRepository: Repository<JWTEntity>,
  ) {}

  validateAccessToken(payload: unknown): Promise<UserModel> {
    return this.validateToken(payload, JWTType.ACCESS_TOKEN);
  }
  validateRefreshToken(payload: unknown): Promise<UserModel> {
    return this.validateToken(payload, JWTType.REFRESH_TOKEN);
  }

  private async validateToken(
    payload: unknown,
    jwtType: JWTType,
  ): Promise<UserModel> {
    if (!this.isValidJwtPayload(payload)) {
      throw new UnauthorizedException();
    }

    if (
      payload.aud !== this.configService.get<string>(CONFIG.APP_FRONTEND_URL) ||
      payload.iss !== this.configService.get<string>(CONFIG.APP_BACKEND_URL)
    ) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.findByWallet(payload.walletAddress);

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

  private isValidJwtPayload(payload: any): payload is JWTPayload {
    if (
      !payload?.aud ||
      !payload?.iss ||
      !payload?.jti ||
      !payload?.sub ||
      !payload?.code
    ) {
      return false;
    }

    return true;
  }
}
