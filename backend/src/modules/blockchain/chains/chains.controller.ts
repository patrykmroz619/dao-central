import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ChainsService } from "./chains.service";
import { GetChainsDocs, SaveChainDocs } from "./docs";
import { ChainDto, GetChainsDto, SaveChainDto } from "./dto";

@ApiTags("Chains")
@Controller("chains")
export class ChainsController {
  constructor(private chainsService: ChainsService) {}

  @GetChainsDocs()
  @Get()
  public async getChains(): Promise<GetChainsDto> {
    return this.chainsService.getChains();
  }

  @SaveChainDocs()
  @Post()
  public async saveChain(
    @Body() saveChainDto: SaveChainDto,
  ): Promise<ChainDto> {
    return this.chainsService.saveChain(saveChainDto);
  }
}
