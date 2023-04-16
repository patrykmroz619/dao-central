import { applyDecorators } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { ErrorDto } from "src/global";

export const LogoutDocs = () =>
  applyDecorators(
    ApiOkResponse({
      description: "Successful logout",
    }),
    ApiUnauthorizedResponse({ type: ErrorDto }),
    ApiBearerAuth(),
  );
