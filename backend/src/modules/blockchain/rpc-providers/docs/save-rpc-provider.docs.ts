import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from "@nestjs/swagger";
import { ErrorDto } from "src/global";
import { RPCProviderDto } from "../dto";

export const SaveRPCProviderDocs = () =>
  applyDecorators(
    ApiOperation({ summary: "Save new rpc provider" }),
    ApiCreatedResponse({ type: RPCProviderDto }),
    ApiBadRequestResponse({ type: ErrorDto }),
  );
