import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiHeader,
  ApiOperation,
} from "@nestjs/swagger";

import { CUSTOM_HEADERS } from "src/constants";
import { ErrorDto } from "src/global";
import { RPCProviderDto } from "../dto";

export const SaveRPCProviderDocs = () =>
  applyDecorators(
    ApiOperation({ summary: "Save new rpc provider" }),
    ApiHeader({
      name: CUSTOM_HEADERS.ADMIN_API_KEY,
    }),
    ApiCreatedResponse({ type: RPCProviderDto }),
    ApiBadRequestResponse({ type: ErrorDto }),
    ApiForbiddenResponse({ type: ErrorDto }),
  );
