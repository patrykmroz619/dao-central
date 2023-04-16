import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiQuery } from "@nestjs/swagger";

import { InitLoginResponseDto } from "../dto";

export const InitLoginDocs = () =>
  applyDecorators(
    ApiOperation({
      summary: "Initialize login procedure via wallet and get message to sign",
    }),
    ApiQuery({
      name: "walletAddress",
      required: true,
      description: "The user's wallet address",
    }),
    ApiOkResponse({ type: InitLoginResponseDto }),
  );
