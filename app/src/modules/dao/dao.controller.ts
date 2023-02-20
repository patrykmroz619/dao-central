import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { JwtAuthGuard } from "src/guards";
import { DaoService } from "./dao.service";
import { SaveDaoDocs } from "./docs";
import { DaoDto, SaveDaoDto } from "./dto";

@ApiTags("DAO")
@Controller("dao")
export class DaoController {
  constructor(private daoService: DaoService) {}

  @Post()
  @SaveDaoDocs()
  @UseGuards(JwtAuthGuard)
  async saveDAO(@Body() saveDaoDto: SaveDaoDto): Promise<DaoDto> {
    return this.daoService.saveDAO(
      saveDaoDto.chainId,
      saveDaoDto.contractAddress,
    );
  }
}
