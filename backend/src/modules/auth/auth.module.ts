import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { InitLoginEntity } from "./init-login.entity";
import { JwtAccessTokenStrategy } from "./jwt-access.strategy";
import { JwtRefreshTokenStrategy } from "./jwt-refresh.strategy";
import { JwtModule } from "./jwt/jwt.module";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
    JwtModule,
    UsersModule,
    TypeOrmModule.forFeature([InitLoginEntity]),
  ],
  providers: [AuthService, JwtAccessTokenStrategy, JwtRefreshTokenStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
