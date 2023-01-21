import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
} from "@nestjs/swagger";
import { ErrorDto } from "src/global";
import { ChainDto, SaveChainDto } from "../dto";

export const SaveChainDocs = () =>
  applyDecorators(
    ApiOperation({ summary: "Save a new chain to the database" }),
    ApiBody({ type: SaveChainDto }),
    ApiCreatedResponse({
      description: "Data of the new saved chain",
      type: ChainDto,
    }),
    ApiBadRequestResponse({ type: ErrorDto }),
  );
