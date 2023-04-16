import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { User, Ip } from "src/decorators";
import { JwtRefreshGuard, JwtAuthGuard } from "src/guards";
import { UserEntity } from "src/modules/users/infrastructure/entities/users.entity";
import { AuthService } from "./auth.service";
import {
  InitLoginResponseDto,
  JwtTokensResponseDto,
  LoginRequestDto,
} from "./dto";
import { InitLoginDocs, LoginDocs, LogoutDocs } from "./docs";
import { RefreshTokenDocs } from "./docs/refresh-token.docs";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get("/login")
  @InitLoginDocs()
  async initLogin(
    @Query("walletAddress") walletAddress: string,
  ): Promise<InitLoginResponseDto> {
    return this.authService.initLogin(walletAddress);
  }

  @Post("/login")
  @LoginDocs()
  async login(
    @Ip() ip: string,
    @Body() loginData: LoginRequestDto,
  ): Promise<JwtTokensResponseDto> {
    return this.authService.login(
      loginData.walletAddress,
      loginData.signature,
      ip,
    );
  }

  @Delete("/logout")
  @LogoutDocs()
  @UseGuards(JwtAuthGuard)
  async logout(@User() user: UserEntity): Promise<void> {
    return this.authService.logout(user);
  }

  @Post("/refresh")
  @RefreshTokenDocs()
  @UseGuards(JwtRefreshGuard)
  async refreshToken(
    @User() user: UserEntity,
    @Ip() ip: string,
  ): Promise<JwtTokensResponseDto> {
    return this.authService.refreshToken(user, ip);
  }
}
