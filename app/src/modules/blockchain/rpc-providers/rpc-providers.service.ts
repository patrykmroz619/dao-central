import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import { ethers } from "ethers";
import { ERRORS } from "src/constants";

import { RPCProviderDto, SaveRPCProviderDto } from "./dto";
import { ChainEntity } from "../chains/chains.entity";
import { ChainsService } from "../chains/chains.service";
import { RpcProviderEntity } from "./rpc-providers.entity";
import { RPCProviderType } from "./rpc-providers.type";

@Injectable()
export class RpcProvidersService {
  private logger = new Logger(RpcProvidersService.name);
  private readonly ERRORS_LIMIT = 5;

  constructor(
    private chainService: ChainsService,
    @InjectRepository(RpcProviderEntity)
    private rpcProvidersRepository: Repository<RpcProviderEntity>,
  ) {}

  public async saveRPCProvider({
    url,
  }: SaveRPCProviderDto): Promise<RPCProviderDto> {
    const sameRpcProvider = await this.rpcProvidersRepository.findOne({
      where: { url },
    });

    if (sameRpcProvider) {
      throw new BadRequestException(ERRORS.rpcProviders.providerAlreadyExists);
    }

    const providerType = this.getProviderType(url);

    let rpcProvider: ethers.Provider;

    if (providerType === RPCProviderType.WSS) {
      rpcProvider = new ethers.WebSocketProvider(url);
    } else if (providerType === RPCProviderType.HTTPS) {
      rpcProvider = new ethers.JsonRpcProvider(url);
    } else {
      throw new Error("Unsupported provider type");
    }

    const { chainId: providerChainId } = await rpcProvider.getNetwork();

    const chain = await this.chainService.getChainByChainId(
      Number(providerChainId),
    );

    if (!chain) {
      throw new BadRequestException(ERRORS.rpcProviders.chainNotFound);
    }

    const savedRPCProvider = await this.rpcProvidersRepository.save({
      type: providerType,
      url,
      chain,
    });

    return {
      id: savedRPCProvider.id,
      type: savedRPCProvider.type,
      url: savedRPCProvider.url,
      chainId: savedRPCProvider.chain.chainId,
      chainName: savedRPCProvider.chain.name,
    };
  }

  public async getRPCProvider(
    chainId: ChainEntity["chainId"],
    type: RPCProviderType,
    exceptId?: RpcProviderEntity["id"],
  ): Promise<RpcProviderEntity | null> {
    const RpcProviderEntity = await this.rpcProvidersRepository.findOne({
      where: {
        type,
        chain: { chainId },
        id: exceptId ? Not(exceptId) : undefined,
      },
      order: {
        usageCount: "ASC",
        lastUsage: "ASC",
      },
    });

    if (!RpcProviderEntity) {
      return null;
    }

    RpcProviderEntity.lastUsage = new Date();
    RpcProviderEntity.usageCount++;

    await this.rpcProvidersRepository.save(RpcProviderEntity);

    return RpcProviderEntity;
  }

  public async getJsonRpcProvider(
    chainId: ChainEntity["chainId"],
    exceptId?: RpcProviderEntity["id"],
  ): Promise<[ethers.JsonRpcProvider, RpcProviderEntity]> {
    const rpcProviderEntity = await this.getRPCProvider(
      chainId,
      RPCProviderType.HTTPS,
      exceptId,
    );

    if (!rpcProviderEntity) {
      throw new Error(`RPC provider for given chain id (${chainId}) not found`);
    }

    const JsonRpcProvider = new ethers.JsonRpcProvider(rpcProviderEntity.url);

    return [JsonRpcProvider, rpcProviderEntity];
  }

  public async getWebsocketProvider(
    chainId: ChainEntity["chainId"],
  ): Promise<[ethers.WebSocketProvider, RpcProviderEntity]> {
    const rpcProviderEntity = await this.getRPCProvider(
      chainId,
      RPCProviderType.WSS,
    );

    if (!rpcProviderEntity) {
      throw new Error(`RPC provider for given chain id (${chainId}) not found`);
    }

    const WebsocketProvider = new ethers.WebSocketProvider(
      rpcProviderEntity.url,
    );
    return [WebsocketProvider, rpcProviderEntity];
  }

  public async reportProviderError(
    providerId: RpcProviderEntity["id"],
  ): Promise<void> {
    const rpcProviderEntity = await this.rpcProvidersRepository.findOneOrFail({
      where: { id: providerId },
    });

    rpcProviderEntity.errorsCount++;

    await this.rpcProvidersRepository.save(rpcProviderEntity);
  }

  public async executeJsonRpcQuery<T>(
    query: (provider: ethers.Provider) => T,
    chainId: ChainEntity["chainId"],
    queryName: string,
  ): Promise<T> {
    let [JsonRpcProvider, RpcProviderEntity] = await this.getJsonRpcProvider(
      chainId,
    );

    let errorsCount = 0;

    while (errorsCount < this.ERRORS_LIMIT) {
      try {
        this.logger.log(
          `Execute ${queryName} query by provider with id ${RpcProviderEntity.id}`,
        );
        return await query(JsonRpcProvider);
      } catch (e: unknown) {
        errorsCount++;
        this.logger.error(
          `Rpc query failed (Query - ${queryName}, chainId - ${chainId}, providerId - ${RpcProviderEntity.id}), Error: ${e}`,
        );
        await this.reportProviderError(RpcProviderEntity.id);
        [JsonRpcProvider, RpcProviderEntity] = await this.getJsonRpcProvider(
          chainId,
          RpcProviderEntity.id,
        );
      }
    }
  }

  private getProviderType(url: RpcProviderEntity["url"]): RPCProviderType {
    if (url.startsWith("https")) {
      return RPCProviderType.HTTPS;
    }

    if (url.startsWith("wss")) {
      return RPCProviderType.WSS;
    }

    throw new BadRequestException(ERRORS.rpcProviders.invalidUrl);
  }
}
