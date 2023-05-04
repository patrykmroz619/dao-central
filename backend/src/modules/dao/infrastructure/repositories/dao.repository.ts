import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FilterOperator, paginate, PaginateQuery } from "nestjs-paginate";
import { ChainsService } from "src/modules/blockchain/chains/chains.service";
import { UsersService } from "src/modules/users/presentation/services/users.service";
import { Repository } from "typeorm";
import { DaoModel } from "../../domain/models/dao.model";
import { DaosRepositoryPort } from "../../domain/ports/daos-repository.port";
import { SaveDaoData } from "../../domain/types/save-dao-data.type";
import { DaoEntity } from "../entities/dao.entity";

@Injectable()
export class DaoRepository implements DaosRepositoryPort {
  constructor(
    @InjectRepository(DaoEntity)
    private daoRepository: Repository<DaoEntity>,
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
      relations: ["owner", "chain"],
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
    } = daoData;

    const chain = await this.chainsService.getChainByChainId(chainId);
    const owner = await this.usersService.findByWallet(ownerAddress);

    const newDao = await this.daoRepository.save({
      contractAddress: contractAddress.toLowerCase(),
      organization: organizationName,
      nftAddress: tokenAddress.toLowerCase(),
      chain,
      owner,
    });

    return this.convertDaoEntityToDaoModel(newDao);
  }

  private convertDaoEntityToDaoModel(daoEntity: DaoEntity): DaoModel {
    return new DaoModel(
      daoEntity.id,
      daoEntity.chain.chainId,
      daoEntity.contractAddress,
      daoEntity.owner.walletAddress,
      daoEntity.organization,
      daoEntity.nftAddress,
    );
  }
}
