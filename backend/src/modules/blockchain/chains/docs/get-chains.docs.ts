import { applyDecorators } from "@nestjs/common";
import {
  ApiForbiddenResponse,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";

import { CUSTOM_HEADERS } from "src/constants";
import { ErrorDto } from "src/global";
import { GetChainsDto } from "../dto";

export const GetChainsDocs = () =>
  applyDecorators(
    ApiOperation({
      summary: "Get the list of all chains",
    }),
    ApiHeader({
      name: CUSTOM_HEADERS.ADMIN_API_KEY,
    }),
    ApiOkResponse({ type: GetChainsDto }),
    ApiForbiddenResponse({ type: ErrorDto }),
  );
