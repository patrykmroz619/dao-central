import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiHeader,
  ApiOperation,
} from "@nestjs/swagger";

import { CUSTOM_HEADERS } from "src/constants";
import { ErrorDto } from "src/global";
import { ChainDto, SaveChainDto } from "../dto";

export const SaveChainDocs = () =>
  applyDecorators(
    ApiOperation({ summary: "Save a new chain to the database" }),
    ApiHeader({
      name: CUSTOM_HEADERS.ADMIN_API_KEY,
    }),
    ApiBody({ type: SaveChainDto }),
    ApiCreatedResponse({
      description: "Data of the new saved chain",
      type: ChainDto,
    }),
    ApiBadRequestResponse({ type: ErrorDto }),
    ApiForbiddenResponse({ type: ErrorDto }),
  );
