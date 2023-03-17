import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { JwtAuthGuard } from "src/guards";
import { GetCurrentUserDocs } from "./docs";
import { UserResponseDto } from "./dto";

@ApiTags("users")
@Controller("users")
export class UsersController {
  @Get("me")
  @GetCurrentUserDocs()
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@Request() req): Promise<UserResponseDto> {
    return {
      id: req.user.id,
      walletAddress: req.user.walletAddress,
      createdAt: req.user.createdAt,
    };
  }
}
