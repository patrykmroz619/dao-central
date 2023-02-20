import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Paginate, PaginateQuery } from "nestjs-paginate";

import { JwtAuthGuard } from "src/guards";
import { DaoService } from "./dao.service";
import { SaveDaoDocs } from "./docs";
import { GetDaosDocs } from "./docs/get-daos.docs";
import { DaoDto, GetDaosDto, SaveDaoDto } from "./dto";

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

  @Get()
  @GetDaosDocs()
  async getDAOs(@Paginate() query: PaginateQuery): Promise<GetDaosDto> {
    return this.daoService.getDAOs(query);
  }
}
