import { applyDecorators } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { ErrorDto, SuccessDto } from "src/global";

export const UpdateDaoInformationDocs = () =>
  applyDecorators(
    ApiOperation({
      summary: "Update information about description and extra links",
    }),
    ApiParam({
      name: "id",
      type: String,
    }),
    ApiBearerAuth(),
    ApiCreatedResponse({
      type: SuccessDto,
    }),
    ApiForbiddenResponse({
      type: ErrorDto,
    }),
    ApiUnauthorizedResponse({
      type: ErrorDto,
    }),
  );
