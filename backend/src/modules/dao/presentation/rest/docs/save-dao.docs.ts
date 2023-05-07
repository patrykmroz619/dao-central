import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
} from "@nestjs/swagger";

import { ErrorDto } from "src/global";
import { SaveDaoDto, SaveDaoResponseDto } from "../dto";

export const SaveDaoDocs = () =>
  applyDecorators(
    ApiOperation({ summary: "Save a new DAO contract" }),
    ApiBody({ type: SaveDaoDto }),
    ApiBearerAuth(),
    ApiCreatedResponse({
      description: "Data of the new DAO",
      type: SaveDaoResponseDto,
    }),
    ApiBadRequestResponse({ type: ErrorDto }),
  );
