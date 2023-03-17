import { applyDecorators } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { ErrorDto } from "src/global";
import { JwtTokensResponseDto } from "../dto";

export const RefreshTokenDocs = () =>
  applyDecorators(
    ApiOperation({ summary: "Refresh an access token" }),
    ApiCreatedResponse({
      type: JwtTokensResponseDto,
    }),
    ApiUnauthorizedResponse({ type: ErrorDto }),
    ApiBearerAuth("Refresh token"),
  );
