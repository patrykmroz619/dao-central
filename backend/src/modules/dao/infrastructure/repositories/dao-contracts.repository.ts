import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ethers } from "ethers";
import { CONFIG } from "src/constants";
import { ChainsService } from "src/modules/blockchain/chains/chains.service";
import { RpcProvidersService } from "src/modules/blockchain/rpc-providers/rpc-providers.service";
import { DaoContractsRepositoryPort } from "../../domain/ports/dao-contracts-repository.port";
import { nftVotingContractAbi, nftVotingFactoryContractAbi } from "../abi";

@Injectable()
export class DaoContractsRepository implements DaoContractsRepositoryPort {
  private factoryContract: ethers.Contract;

  constructor(
    private configService: ConfigService,
    private chainsService: ChainsService,
    private rpcProvidersService: RpcProvidersService,
  ) {
    const nftVotingFactoryContractAddress = this.configService.get<string>(
      CONFIG.NFT_VOTING_FACTORY_ADDRESS,
    );

    this.factoryContract = new ethers.Contract(
      nftVotingFactoryContractAddress,
      nftVotingFactoryContractAbi,
    );
  }

  public async getDeployedContractsCount(chainId: number): Promise<number> {
    const deployedContractsCount: bigint =
      await this.rpcProvidersService.executeJsonRpcQuery(
        (provider) =>
          (
            this.factoryContract.connect(provider) as ethers.Contract
          ).deployedContractsCount(),
        chainId,
        "Deployed contracts count",
      );

    return Number(deployedContractsCount.toString());
  }

  public async getContractAddressByIndex(
    chainId: number,
    index: number,
  ): Promise<string> {
    const daoAddress: string =
      await this.rpcProvidersService.executeJsonRpcQuery(
        (provider) =>
          (
            this.factoryContract.connect(provider) as ethers.Contract
          ).deployedContracts(index),
        chainId,
        "Get Deployed contract address",
      );

    return daoAddress;
  }

  public async getContractDataByChainIdAndAddress(
    chainId: number,
    contractAddress: string,
  ): Promise<{
    ownerAddress: string;
    organizationName: string;
    tokenAddress: string;
  }> {
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

    return {
      ownerAddress,
      organizationName: organization,
      tokenAddress: nftAddress,
    };
  }
}
