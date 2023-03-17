import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
} from "@nestjs/swagger";
import { ErrorDto } from "src/global";
import { DaoDto, SaveDaoDto } from "../dto";

export const SaveDaoDocs = () =>
  applyDecorators(
    ApiOperation({ summary: "Save a new DAO contract" }),
    ApiBody({ type: SaveDaoDto }),
    ApiCreatedResponse({
      description: "Data of the new DAO",
      type: DaoDto,
    }),
    ApiBadRequestResponse({ type: ErrorDto }),
  );
