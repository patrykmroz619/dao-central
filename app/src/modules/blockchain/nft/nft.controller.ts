import { Controller, Get, Query, Request, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { JwtAuthGuard } from "src/guards";
import { GetUserTokensDocs } from "./docs";
import { GetUserTokensDto, GetUserTokensQueryDto } from "./dto";
import { NftService } from "./nft.service";

@ApiTags("NFT")
@Controller("nft")
export class NftController {
  constructor(private nftService: NftService) {}

  @Get("user-tokens")
  @GetUserTokensDocs()
  @UseGuards(JwtAuthGuard)
  public async getUserTokens(
    @Request() req,
    @Query() query: GetUserTokensQueryDto,
  ): Promise<GetUserTokensDto> {
    return this.nftService.getUserTokens(
      req.user,
      query.chainId,
      query.collectionAddress,
    );
  }
}
