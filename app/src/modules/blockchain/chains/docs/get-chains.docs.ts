import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { GetChainsDto } from "../dto";

export const GetChainsDocs = () =>
  applyDecorators(
    ApiOperation({
      summary: "Get the list of all chains",
    }),
    ApiOkResponse({ type: GetChainsDto }),
  );
