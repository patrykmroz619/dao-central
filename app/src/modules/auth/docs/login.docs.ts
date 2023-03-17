import { applyDecorators } from "@nestjs/common";
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { ErrorDto } from "src/global";
import { JwtTokensResponseDto, LoginRequestDto } from "../dto";

export const LoginDocs = () =>
  applyDecorators(
    ApiOperation({
      summary: "Login with a signed signature and get JWTs",
    }),
    ApiBody({ type: LoginRequestDto }),
    ApiCreatedResponse({
      type: JwtTokensResponseDto,
    }),
    ApiUnauthorizedResponse({ type: ErrorDto }),
  );
