import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Cron, CronExpression } from "@nestjs/schedule";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ethers } from "ethers";
import { FilterOperator, paginate, PaginateQuery } from "nestjs-paginate";

import { CONFIG, ERRORS } from "src/constants";
import { ChainsService } from "../blockchain/chains/chains.service";
import { ChainDto } from "../blockchain/chains/dto";
import { RpcProvidersService } from "../blockchain/rpc-providers/rpc-providers.service";
import { UsersService } from "../users/users.service";
import { nftVotingContractAbi, nftVotingFactoryContractAbi } from "./abi";
import { DaoEntity } from "./dao.entity";
import { DaoDto, GetDaosDto } from "./dto";

@Injectable()
export class DaoService {
  private readonly logger = new Logger(DaoService.name);
  private factoryContract: ethers.Contract;

  constructor(
    private configService: ConfigService,
    private chainsService: ChainsService,
    private rpcProvidersService: RpcProvidersService,
    private userService: UsersService,
    @InjectRepository(DaoEntity)
    private daoRepository: Repository<DaoEntity>,
  ) {
    const nftVotingFactoryContractAddress = this.configService.get<string>(
      CONFIG.NFT_VOTING_FACTORY_ADDRESS,
    );

    this.factoryContract = new ethers.Contract(
      nftVotingFactoryContractAddress,
      nftVotingFactoryContractAbi,
    );
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  public async handleCron() {
    this.logger.log("Cron to detect unsaved DAOs started");

    const { chains } = await this.chainsService.getChains();

    for (const chain of chains) {
      try {
        const deployedContractsCount: bigint =
          await this.rpcProvidersService.executeJsonRpcQuery(
            (provider) =>
              (
                this.factoryContract.connect(provider) as ethers.Contract
              ).deployedContractsCount(),
            chain.chainId,
            "Deployed contracts count",
          );

        const savedContracts = await this.daoRepository.find({
          where: {
            chain: {
              chainId: chain.chainId,
            },
          },
          relations: {
            chain: true,
          },
        });

        const savedContractsCount = savedContracts.length;

        if (savedContractsCount < deployedContractsCount) {
          let lackedContractsCount =
            Number(deployedContractsCount.toString()) - savedContractsCount;

          for (let i = deployedContractsCount - BigInt(1); i >= 0; i--) {
            const daoAddress: string =
              await this.rpcProvidersService.executeJsonRpcQuery(
                (provider) =>
                  (
                    this.factoryContract.connect(provider) as ethers.Contract
                  ).deployedContracts(i),
                chain.chainId,
                "Get Deployed contract address",
              );

            if (daoAddress !== ethers.ZeroAddress) {
              const newDao = await this.saveDAO(chain.chainId, daoAddress);

              const isAlreadySaved = savedContracts.some(
                (dao) =>
                  dao.contractAddress.toLowerCase() ===
                  newDao.contractAddress.toLowerCase(),
              );

              if (!isAlreadySaved) {
                lackedContractsCount--;
              }

              if (lackedContractsCount === 0) {
                break;
              }
            }
          }
        }
      } catch (error: unknown) {
        this.logger.error(`Cron Error: ${error}`);
      }
    }
  }

  public async saveDAO(
    chainId: ChainDto["chainId"],
    contractAddress: string,
  ): Promise<DaoDto> {
    const chain = await this.chainsService.getChainByChainId(chainId);

    const dao = await this.daoRepository.findOne({
      where: {
        contractAddress: contractAddress.toLowerCase(),
        chain,
      },
      relations: {
        owner: true,
        chain: true,
      },
    });

    if (dao) {
      return {
        id: dao.id,
        contractAddress: dao.contractAddress,
        nftAddress: dao.nftAddress,
        organization: dao.organization,
        owner: dao.owner.walletAddress,
        chainId: dao.chain.chainId,
        chainName: dao.chain.name,
      };
    }

    const [ownerAddress, organization, nftAddress] =
      await this.rpcProvidersService.executeJsonRpcQuery(
        (provider) => {
          const NFTVotingContract = new ethers.Contract(
            contractAddress,
            nftVotingContractAbi,
            provider,
          );

          return Promise.all([
            NFTVotingContract.owner(),
            NFTVotingContract.organizationName(),
            NFTVotingContract.nft(),
          ]);
        },
        chainId,
        "Get owner of NFTVoting contract",
      );

    const owner = await this.userService.getUser(ownerAddress);

    const newDao = await this.daoRepository.save({
      contractAddress: contractAddress.toLowerCase(),
      organization,
      nftAddress: nftAddress.toLowerCase(),
      chain,
      owner,
    });

    return {
      id: newDao.id,
      contractAddress: newDao.contractAddress,
      nftAddress: newDao.nftAddress,
      organization: newDao.organization,
      owner: newDao.owner.walletAddress,
      chainId: dao.chain.chainId,
      chainName: dao.chain.name,
    };
  }

  public async getDAOs(query: PaginateQuery): Promise<GetDaosDto> {
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
      data: data.map((dao) => ({
        id: dao.id,
        contractAddress: dao.contractAddress,
        nftAddress: dao.nftAddress,
        organization: dao.organization,
        owner: dao.owner.walletAddress,
        chainId: dao.chain.chainId,
        chainName: dao.chain.name,
      })),
      count: meta.totalItems,
    };
  }

  public async getDAO(daoId: DaoEntity["id"]): Promise<DaoDto> {
    console.log({ daoId });
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
      throw new NotFoundException(ERRORS.dao.notFound);
    }

    return {
      id: dao.id,
      contractAddress: dao.contractAddress,
      nftAddress: dao.nftAddress,
      organization: dao.organization,
      owner: dao.owner.walletAddress,
      chainId: dao.chain.chainId,
      chainName: dao.chain.name,
    };
  }
}
