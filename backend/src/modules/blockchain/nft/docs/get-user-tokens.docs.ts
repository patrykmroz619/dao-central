import { applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { GetUserTokensDto } from "../dto";

export const GetUserTokensDocs = () =>
  applyDecorators(
    ApiOperation({ summary: "Get list of user NFT tokens" }),
    ApiOkResponse({
      description: "List of NFTs",
      type: GetUserTokensDto,
    }),
    ApiBearerAuth(),
  );
