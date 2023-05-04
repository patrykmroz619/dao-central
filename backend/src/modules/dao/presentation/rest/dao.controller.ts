import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Paginate, PaginateQuery } from "nestjs-paginate";
import { ERRORS } from "src/constants";
import { SuccessDto } from "src/global";

import { JwtAuthGuard } from "src/guards";
import { GetDaoService } from "../../domain/application/get-dao.service";
import { RegisterDaoService } from "../../domain/application/register-dao.service";
import { DaoAlreadyExistsException } from "../../domain/exceptions/dao-already-exist.exception";
import { DaoNotFoundException } from "../../domain/exceptions/dao-not-found.exception";
import { SaveDaoDocs, GetDaosDocs, GetDaoDocs } from "./docs";
import { DaoDetailsDto, GetDaosDto, SaveDaoDto } from "./dto";

@ApiTags("DAO")
@Controller("dao")
export class DaoController {
  constructor(
    private registerDaoService: RegisterDaoService,
    private getDaoService: GetDaoService,
  ) {}

  @Post()
  @SaveDaoDocs()
  @UseGuards(JwtAuthGuard)
  async registerDAO(@Body() saveDaoDto: SaveDaoDto): Promise<SuccessDto> {
    try {
      await this.registerDaoService.registerDao(
        saveDaoDto.chainId,
        saveDaoDto.contractAddress,
      );

      return { success: true };
    } catch (error: unknown) {
      if (error instanceof DaoAlreadyExistsException) {
        throw new BadRequestException(ERRORS.dao.alreadyExist);
      }

      throw error;
    }
  }

  @Get(":id")
  @GetDaoDocs()
  async getDAO(@Param("id") id: string): Promise<DaoDetailsDto> {
    try {
      const dao = await this.getDaoService.getDaoById(Number(id));

      return {
        id: dao.id,
        chainId: dao.chainId,
        contractAddress: dao.contractAddress,
        nftAddress: dao.tokenAddress,
        organization: dao.organizationName,
        owner: dao.ownerAddress,
        description: dao.organizationDescription,
        socialLinks: dao.socialMediaLinks ?? [],
      };
    } catch (error: unknown) {
      if (error instanceof DaoNotFoundException) {
        throw new NotFoundException(ERRORS.dao.notFound);
      }

      throw error;
    }
  }

  @Get()
  @GetDaosDocs()
  async getDAOs(@Paginate() query: PaginateQuery): Promise<GetDaosDto> {
    const { count, daos } = await this.getDaoService.paginateDaos(query);

    return {
      count,
      data: daos.map((dao) => ({
        id: dao.id,
        chainId: dao.chainId,
        contractAddress: dao.contractAddress,
        nftAddress: dao.tokenAddress,
        organization: dao.organizationName,
        owner: dao.ownerAddress,
      })),
    };
  }
}
