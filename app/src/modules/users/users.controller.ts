import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { ErrorDto } from "src/global";
import { JwtAuthGuard } from "src/guards";
import { UserResponseDto } from "./dto";

@ApiTags("users")
@Controller("users")
export class UsersController {
  @Get("me")
  @ApiOperation({ summary: "Get data of logged user" })
  @ApiOkResponse({ type: UserResponseDto })
  @ApiUnauthorizedResponse({ type: ErrorDto })
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@Request() req): Promise<UserResponseDto> {
    return {
      id: req.user.id,
      walletAddress: req.user.walletAddress,
      createdAt: req.user.createdAt,
    };
  }
}
