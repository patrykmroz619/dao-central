import { Injectable, Logger } from "@nestjs/common";
import { ethers } from "ethers";
import { ChainEntity } from "../chains/chains.entity";
import { RpcProviderEntity } from "../rpc-providers/rpc-providers.entity";
import { RpcProvidersService } from "../rpc-providers/rpc-providers.service";

type GetEventsFunctionOptions = {
  blocksPerRequest?: number;
};

@Injectable()
export class EventsCrawlerService {
  constructor(private rpcProvidersService: RpcProvidersService) {}

  private readonly logger = new Logger(EventsCrawlerService.name);
  private readonly DEFAULT_BLOCKS_PER_REQUEST = 1000;

  public async getEvents(
    chainId: ChainEntity["chainId"],
    fromBlock: number,
    contract: ethers.Contract,
    filter: ethers.EventFilter,
    handleEvent: (
      event: ethers.Event,
      providerURLToHandleEvent: RpcProviderEntity["url"],
    ) => Promise<void>,
    onCrawlerStateChange?: (
      crawledBlock: number,
      isEventListening: boolean,
    ) => void,
    options?: GetEventsFunctionOptions,
  ) {
    const blocksPerRequest =
      options?.blocksPerRequest ?? this.DEFAULT_BLOCKS_PER_REQUEST;

    // eslint-disable-next-line prefer-const
    let [JsonRpcProvider, , providerEntity] =
      await this.rpcProvidersService.getJsonRpcProvider(chainId);

    let toBlock = await JsonRpcProvider.getBlockNumber();

    contract = contract.connect(JsonRpcProvider);

    while (fromBlock <= toBlock) {
      let to = fromBlock + blocksPerRequest - 1;

      if (to > toBlock) {
        to = toBlock;
      }

      this.logger.log(
        `Get events from ${fromBlock} block to ${to} block... (chainId - ${chainId}, contract - ${contract.address})`,
      );

      try {
        const events = await contract.queryFilter(filter, fromBlock, to);

        for (const event of events) {
          await handleEvent(event, providerEntity.url);
        }

        toBlock = await JsonRpcProvider.getBlockNumber();

        if (onCrawlerStateChange) {
          onCrawlerStateChange(to, false);
        }

        fromBlock += blocksPerRequest;
      } catch (error: unknown) {
        this.logger.error(
          `Error while fetching or handling events (chainId - ${chainId}, contract - ${contract.address}, provider id - ${providerEntity.id}). Error: ${error}`,
        );
        await this.rpcProvidersService.reportProviderError(providerEntity.id);
        [JsonRpcProvider, , providerEntity] =
          await this.rpcProvidersService.getJsonRpcProvider(
            chainId,
            providerEntity.id,
          );
      }
    }

    this.logger.log(
      `Listening for new events... (chainId - ${chainId}, contract - ${contract.address})`,
    );

    if (onCrawlerStateChange) {
      onCrawlerStateChange(toBlock, true);
    }

    const [WebSocketProvider] =
      await this.rpcProvidersService.getWebsocketProvider(chainId);

    contract.connect(WebSocketProvider);

    contract.on(filter, async (...args) => {
      while (true) {
        try {
          // There is entire object of event in the last argument
          const event: ethers.Event = args[args.length - 1];

          await handleEvent(event, providerEntity.url);

          if (onCrawlerStateChange) {
            onCrawlerStateChange(event.blockNumber, true);
          }

          break;
        } catch (error: unknown) {
          this.logger.error(
            `Error while processing event (chainId - ${chainId}, contract - ${contract.address}, provider id - ${providerEntity.id})). Error: ${error}`,
          );
          await this.rpcProvidersService.reportProviderError(providerEntity.id);
          [JsonRpcProvider, , providerEntity] =
            await this.rpcProvidersService.getJsonRpcProvider(
              chainId,
              providerEntity.id,
            );
        }
      }
    });
  }
}
