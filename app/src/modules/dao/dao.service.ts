import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Cron, CronExpression } from "@nestjs/schedule";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ethers } from "ethers";

import { CONFIG } from "src/constants";
import { ChainsService } from "../blockchain/chains/chains.service";
import { ChainDto } from "../blockchain/chains/dto";
import { RpcProvidersService } from "../blockchain/rpc-providers/rpc-providers.service";
import { UsersService } from "../users/users.service";
import { nftVotingContractAbi, nftVotingFactoryContractAbi } from "./abi";
import { DaoEntity } from "./dao.entity";
import { DaoDto } from "./dto";

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

  @Cron(CronExpression.EVERY_MINUTE)
  public async handleCron() {
    this.logger.log("Cron start");

    const { chains } = await this.chainsService.getChains();

    for (const chain of chains) {
      const deployedContractsCount: bigint =
        await this.rpcProvidersService.executeJsonRpcQuery(
          (provider) =>
            (
              this.factoryContract.connect(provider) as ethers.Contract
            ).deployedContractsCount(),
          chain.chainId,
          "Deployed contracts count",
        );

      const savedContractsCount = await this.daoRepository.count({
        where: {
          chain: {
            chainId: chain.chainId,
          },
        },
        relations: {
          chain: true,
        },
      });

      if (savedContractsCount < deployedContractsCount) {
        for (let i = savedContractsCount; i < deployedContractsCount; i++) {
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
            await this.saveDAO(chain.chainId, daoAddress);
          }
        }
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
      },
    });

    if (dao) {
      return {
        id: dao.id,
        contractAddress: dao.contractAddress,
        nftAddress: dao.nftAddress,
        organization: dao.organization,
        owner: dao.owner.walletAddress,
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
    };
  }
}
