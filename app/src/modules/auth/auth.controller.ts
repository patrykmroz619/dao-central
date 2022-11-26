import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Res,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { Response } from "express";

import { ErrorDto } from "src/global";
import { User, Ip } from "src/decorators";
import { JwtRefreshGuard, JwtAuthGuard } from "src/guards";
import { UserEntity } from "src/modules/users/users.entity";
import { AuthService } from "./auth.service";
import { InitLoginResponseDto, LoginRequestDto } from "./dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get("/login")
  @ApiOperation({
    summary: "Initialize login procedure via wallet and get message to sign",
  })
  @ApiQuery({
    name: "walletAddress",
    required: true,
    description: "The user's wallet address",
  })
  @ApiOkResponse({ type: InitLoginResponseDto })
  async initLogin(
    @Query("walletAddress") walletAddress: string,
  ): Promise<InitLoginResponseDto> {
    return this.authService.initLogin(walletAddress);
  }

  @Post("/login")
  @ApiOperation({
    summary: "Login with a signed signature and get JWTs via cookies",
  })
  @ApiBody({ type: LoginRequestDto })
  @ApiCreatedResponse({
    description: "Access and refresh token cookies will be set upon success",
  })
  @ApiUnauthorizedResponse({ type: ErrorDto })
  async login(
    @Ip() ip: string,
    @Body() loginData: LoginRequestDto,
    @Res() response: Response,
  ): Promise<void> {
    return this.authService.login(
      loginData.walletAddress,
      loginData.signature,
      ip,
      response,
    );
  }

  @Delete("/logout")
  @ApiOkResponse({
    description: "Successful logout",
  })
  @ApiUnauthorizedResponse({ type: ErrorDto })
  @UseGuards(JwtAuthGuard)
  async logout(@User() user: UserEntity): Promise<void> {
    return this.authService.logout(user);
  }

  @Post("/refresh")
  @ApiOperation({ summary: "Refresh an access token" })
  @ApiCreatedResponse({
    description:
      "New pair of access and refresh token cookies will be set upon success",
  })
  @ApiUnauthorizedResponse({ type: ErrorDto })
  @UseGuards(JwtRefreshGuard)
  async refreshToken(
    @User() user: UserEntity,
    @Ip() ip: string,
    @Res() response: Response,
  ): Promise<void> {
    return this.authService.refreshToken(user, ip, response);
  }
}
