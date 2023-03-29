import { applyDecorators } from "@nestjs/common";
import {
  ApiForbiddenResponse,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";

import { CUSTOM_HEADERS } from "src/constants";
import { ErrorDto } from "src/global";
import { RPCProviderDto } from "../dto";

export const GetRPCProvidersDocs = () =>
  applyDecorators(
    ApiOperation({ summary: "Get rpc providers list" }),
    ApiHeader({
      name: CUSTOM_HEADERS.ADMIN_API_KEY,
    }),
    ApiOkResponse({ type: [RPCProviderDto] }),
    ApiForbiddenResponse({ type: ErrorDto }),
  );
