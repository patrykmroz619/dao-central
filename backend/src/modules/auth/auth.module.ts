import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { JwtModule as NestJwtModule } from "@nestjs/jwt";

import { InitLoginService } from "./domain/application/init-login.service";
import { WalletLoginService } from "./domain/application/wallet-login.service";
import { JwtAccessTokenStrategy } from "./domain/application/jwt-strategies/jwt-access.strategy";
import { JwtRefreshTokenStrategy } from "./domain/application/jwt-strategies/jwt-refresh.strategy";
import { RefreshSessionService } from "./domain/application/refresh-session.service";
import { InitLoginRepositoryPortToken } from "./domain/ports/init-login-repository.port";
import { LoginUserRepositoryPortToken } from "./domain/ports/login-user-repository.port";
import { JwtTokensRepositoryPortToken } from "./domain/ports/jwt-tokens.repository.port";
import { JwtValidatorPortToken } from "./domain/ports/jwt-validator.port";
import { JwtSecretsProviderPortToken } from "./domain/ports/jwt-secrets-provider.port";

import { InitLoginEntity } from "./infrastructure/entities/init-login.entity";
import { LoginUserRepository } from "./infrastructure/repositories/login-user.repository";
import { JwtSecretsProvider } from "./infrastructure/providers/jwt-secrets.provider";
import { JwtValidator } from "./infrastructure/validators/jwt.validator";
import { InitLoginRepository } from "./infrastructure/repositories/init-login.repository";
import { JwtTokensRepository } from "./infrastructure/repositories/jwt-tokens.repository";
import { JWTEntity } from "./infrastructure/entities/jwt.entity";

import { AuthController } from "./presentation/rest/auth.controller";

import { UsersModule } from "../users/users.module";
import { LogoutService } from "./domain/application/logout.service";

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([InitLoginEntity, JWTEntity]),
    NestJwtModule.register({}),
  ],
  providers: [
    { provide: InitLoginRepositoryPortToken, useClass: InitLoginRepository },
    InitLoginService,
    { provide: LoginUserRepositoryPortToken, useClass: LoginUserRepository },
    { provide: JwtTokensRepositoryPortToken, useClass: JwtTokensRepository },
    WalletLoginService,
    { provide: JwtValidatorPortToken, useClass: JwtValidator },
    { provide: JwtSecretsProviderPortToken, useClass: JwtSecretsProvider },
    JwtAccessTokenStrategy,
    JwtRefreshTokenStrategy,
    RefreshSessionService,
    LogoutService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
