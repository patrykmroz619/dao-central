import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { User } from "src/decorators";
import { JwtRefreshGuard, JwtAuthGuard } from "src/guards";
import { ERRORS } from "src/constants";
import { UserModel } from "src/modules/users/domain/models/user.model";
import {
  InitLoginResponseDto,
  JwtTokensResponseDto,
  LoginRequestDto,
} from "./dto";
import { InitLoginDocs, LoginDocs, LogoutDocs, RefreshTokenDocs } from "./docs";
import { InitLoginService } from "../../domain/application/init-login.service";
import { WalletLoginService } from "../../domain/application/wallet-login.service";
import { RefreshSessionService } from "../../domain/application/refresh-session.service";
import { LogoutService } from "../../domain/application/logout.service";
import { BadEthereumAddressException } from "../../domain/exceptions/bad-ethereum-address.exception";
import { InvalidLoginSignatureException } from "../../domain/exceptions/invalid-login-signature.exception";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(
    private initLoginService: InitLoginService,
    private walletLoginService: WalletLoginService,
    private refreshSessionService: RefreshSessionService,
    private logoutService: LogoutService,
  ) {}

  @Get("/login")
  @InitLoginDocs()
  async initLogin(
    @Query("walletAddress") walletAddress: string,
  ): Promise<InitLoginResponseDto> {
    try {
      return await this.initLoginService.initLoginByWallet(walletAddress);
    } catch (error: unknown) {
      if (error instanceof BadEthereumAddressException) {
        throw new BadRequestException(ERRORS.auth.invalidEthAddress);
      }

      throw error;
    }
  }

  @Post("/login")
  @LoginDocs()
  async login(
    @Body() loginData: LoginRequestDto,
  ): Promise<JwtTokensResponseDto> {
    const { walletAddress, signature } = loginData;

    try {
      const jwtTokensModel = await this.walletLoginService.loginByWallet(
        walletAddress,
        signature,
      );

      return {
        accessToken: jwtTokensModel.accessToken,
        accessTokenExpiry: jwtTokensModel.accessTokenExpiry,
        refreshToken: jwtTokensModel.refreshToken,
      };
    } catch (error: unknown) {
      if (error instanceof InvalidLoginSignatureException) {
        throw new UnauthorizedException(ERRORS.auth.invalidSignature);
      }

      throw error;
    }
  }

  @Delete("/logout")
  @LogoutDocs()
  @UseGuards(JwtAuthGuard)
  async logout(@User() user: UserModel): Promise<void> {
    return this.logoutService.logout(user.id);
  }

  @Post("/refresh")
  @RefreshTokenDocs()
  @UseGuards(JwtRefreshGuard)
  async refreshToken(@User() user: UserModel): Promise<JwtTokensResponseDto> {
    return this.refreshSessionService.refreshUserSession(user.id);
  }
}
