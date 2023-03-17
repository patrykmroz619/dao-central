import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { GetDaosDto } from "../dto";

export const GetDaosDocs = () =>
  applyDecorators(
    ApiOperation({ summary: "Get list of DAOs" }),
    ApiOkResponse({
      description: "List of DAOs",
      type: GetDaosDto,
    }),
  );
