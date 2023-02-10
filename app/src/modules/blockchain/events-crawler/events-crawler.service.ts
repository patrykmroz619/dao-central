import { Injectable, Logger } from "@nestjs/common";
import { ethers } from "ethers";
import { ChainEntity } from "../chains/chains.entity";
import { ExternalBlockchainApiService } from "../external-blockchain-api/external-blockchain-api.service";
@Injectable()
export class EventsCrawlerService {
  constructor(
    private externalBlockchainApiService: ExternalBlockchainApiService,
  ) {}

  private readonly logger = new Logger(EventsCrawlerService.name);
  private readonly DEFAULT_BLOCKS_PER_REQUEST = 1000;

  public async registerCrawler(
    chainId: ChainEntity["chainId"],
    fromBlock: number,
    contract: ethers.Contract,
    filter: ethers.EventFilter,
  ): Promise<void> {
    const events = await this.externalBlockchainApiService.getEvents(
      chainId,
      contract,
      filter,
      fromBlock,
    );

    console.log(events);
  }
}
