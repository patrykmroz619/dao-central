import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { User } from "src/decorators";
import { JwtAuthGuard } from "src/guards";
import { UserEntity } from "src/modules/users/infrastructure/entities/users.entity";
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
    @User() user: UserEntity,
    @Query() query: GetUserTokensQueryDto,
  ): Promise<GetUserTokensDto> {
    return this.nftService.getUserTokens(
      user,
      Number(query.chainId),
      query.collectionAddress,
    );
  }
}
