import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Paginate, PaginateQuery } from "nestjs-paginate";

import { JwtAuthGuard } from "src/guards";
import { DaoService } from "./dao.service";
import { SaveDaoDocs, GetDaosDocs, GetDaoDocs } from "./docs";
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

  @Get(":id")
  @GetDaoDocs()
  async getDAO(@Param("id") id: string): Promise<DaoDto> {
    console.log({ id });
    return this.daoService.getDAO(Number(id));
  }

  @Get()
  @GetDaosDocs()
  async getDAOs(@Paginate() query: PaginateQuery): Promise<GetDaosDto> {
    return this.daoService.getDAOs(query);
  }
}
