import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiParam } from "@nestjs/swagger";
import { DaoDto } from "../dto";

export const GetDaoDocs = () =>
  applyDecorators(
    ApiOperation({ summary: "Get data of given dao" }),
    ApiParam({
      name: "id",
      type: String,
    }),
    ApiOkResponse({
      description: "Data of DAO",
      type: DaoDto,
    }),
  );
