import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FilterOperator, paginate, PaginateQuery } from "nestjs-paginate";

import { ChainsService } from "src/modules/blockchain/chains/chains.service";
import { UsersService } from "src/modules/users/presentation/services/users.service";
import { DaoModel } from "../../domain/models/dao.model";
import { DaosRepositoryPort } from "../../domain/ports/daos-repository.port";
import { SaveDaoData } from "../../domain/types/save-dao-data.type";

import { DaoExtraLinkEntity } from "../entities/dao-extra-links.entity";
import { DaoEntity } from "../entities/dao.entity";

@Injectable()
export class DaoRepository implements DaosRepositoryPort {
  constructor(
    @InjectRepository(DaoEntity)
    private daoRepository: Repository<DaoEntity>,
    @InjectRepository(DaoExtraLinkEntity)
    private daoExtraLinkRepository: Repository<DaoExtraLinkEntity>,
    private chainsService: ChainsService,
    private usersService: UsersService,
  ) {}

  public async getDaosByChainId(chainId: number): Promise<DaoModel[]> {
    const daos = await this.daoRepository.find({
      where: {
        chain: {
          chainId,
        },
      },
      relations: {
        chain: true,
        owner: true,
      },
    });

    return daos.map((dao) => this.convertDaoEntityToDaoModel(dao));
  }

  public async getDaoById(daoId: number): Promise<DaoModel | null> {
    const dao = await this.daoRepository.findOne({
      where: {
        id: daoId,
      },
      relations: {
        chain: true,
        owner: true,
        extraLinks: true,
      },
    });

    if (!dao) {
      return null;
    }

    return this.convertDaoEntityToDaoModel(dao);
  }

  public async getDaoByChainIdAndAddress(
    chainId: number,
    contractAddress: string,
  ): Promise<DaoModel> {
    const dao = await this.daoRepository.findOne({
      where: {
        contractAddress,
        chain: {
          chainId,
        },
      },
      relations: {
        chain: true,
        owner: true,
      },
    });

    if (!dao) {
      return null;
    }

    return this.convertDaoEntityToDaoModel(dao);
  }

  public async getPaginatedDaoData(
    query: PaginateQuery,
  ): Promise<{ count: number; data: DaoModel[] }> {
    const { data, meta } = await paginate(query, this.daoRepository, {
      sortableColumns: ["id"],
      filterableColumns: {
        id: [FilterOperator.EQ],
        organization: [FilterOperator.ILIKE],
        nftAddress: [FilterOperator.EQ],
        ["owner.walletAddress"]: [FilterOperator.EQ],
      },
      relations: ["owner", "chain", "extraLinks"],
    });

    return {
      data: data.map((dao) => this.convertDaoEntityToDaoModel(dao)),
      count: meta.totalItems,
    };
  }
  public async saveDao(daoData: SaveDaoData): Promise<DaoModel> {
    const {
      contractAddress,
      organizationName,
      tokenAddress,
      chainId,
      ownerAddress,
      organizationDescription,
      extraLinks = [],
    } = daoData;

    const chain = await this.chainsService.getChainByChainId(chainId);
    const owner = await this.usersService.findByWallet(ownerAddress);

    const extraLinksEntities: DaoExtraLinkEntity[] = [];

    for (const extraLink of extraLinks) {
      const newExtraLink = await this.daoExtraLinkRepository.save({
        type: extraLink.type,
        url: extraLink.url,
      });

      extraLinksEntities.push(newExtraLink);
    }

    const newDao = await this.daoRepository.save({
      contractAddress: contractAddress.toLowerCase(),
      organization: organizationName,
      nftAddress: tokenAddress.toLowerCase(),
      description: organizationDescription,
      chain,
      owner,
      extraLinks: extraLinksEntities,
    });

    return this.convertDaoEntityToDaoModel(newDao);
  }

  public async updateDaoInformation(
    daoId: number,
    description?: string,
    extraLinks?: DaoModel["extraLinks"],
  ): Promise<DaoModel> {
    await this.daoExtraLinkRepository.delete({
      dao: {
        id: daoId,
      },
    });

    const extraLinksEntities: DaoExtraLinkEntity[] = [];

    for (const extraLink of extraLinks) {
      const newExtraLink = await this.daoExtraLinkRepository.save({
        type: extraLink.type,
        url: extraLink.url,
      });

      extraLinksEntities.push(newExtraLink);
    }

    const dao = await this.daoRepository.findOne({
      where: {
        id: daoId,
      },
    });

    dao.description = description;
    dao.extraLinks = extraLinksEntities;
    await this.daoRepository.save(dao);

    return this.convertDaoEntityToDaoModel(dao);
  }

  private convertDaoEntityToDaoModel(daoEntity: DaoEntity): DaoModel {
    return new DaoModel(
      daoEntity.id,
      daoEntity.chain.chainId,
      daoEntity.contractAddress,
      daoEntity.owner.walletAddress,
      daoEntity.organization,
      daoEntity.nftAddress,
      daoEntity.description,
      daoEntity.extraLinks?.map((extraLink) => ({
        type: extraLink.type,
        url: extraLink.url,
      })) || [],
    );
  }
}
