import { applyDecorators } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { ErrorDto } from "src/global";
import { UserResponseDto } from "../dto";

export const GetCurrentUserDocs = () =>
  applyDecorators(
    ApiOperation({ summary: "Get data of logged user" }),
    ApiOkResponse({ type: UserResponseDto }),
    ApiUnauthorizedResponse({ type: ErrorDto }),
    ApiBearerAuth(),
  );
