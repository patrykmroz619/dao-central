import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
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

import { ErrorDto } from "src/global";
import { User, Ip } from "src/decorators";
import { JwtRefreshGuard, JwtAuthGuard } from "src/guards";
import { UserEntity } from "src/modules/users/users.entity";
import { AuthService } from "./auth.service";
import {
  InitLoginResponseDto,
  JwtTokensResponseDto,
  LoginRequestDto,
} from "./dto";

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
    summary: "Login with a signed signature and get JWTs",
  })
  @ApiBody({ type: LoginRequestDto })
  @ApiCreatedResponse({
    type: JwtTokensResponseDto,
  })
  @ApiUnauthorizedResponse({ type: ErrorDto })
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
    type: JwtTokensResponseDto,
  })
  @ApiUnauthorizedResponse({ type: ErrorDto })
  @UseGuards(JwtRefreshGuard)
  async refreshToken(
    @User() user: UserEntity,
    @Ip() ip: string,
  ): Promise<JwtTokensResponseDto> {
    return this.authService.refreshToken(user, ip);
  }
}
