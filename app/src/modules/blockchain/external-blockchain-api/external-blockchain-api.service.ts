import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ethers } from "ethers";
import Moralis from "moralis/.";
import { CONFIG } from "src/constants";
import { ChainEntity } from "../chains/chains.entity";
import { ExternalBlockchainApiEvent } from "./external-blockchain-api.types";

@Injectable()
export class ExternalBlockchainApiService implements OnApplicationBootstrap {
  constructor(private configService: ConfigService) {}

  public async onApplicationBootstrap() {
    const apiKey = this.configService.get<string>(CONFIG.MORALIS_API_KEY);

    await Moralis.start({
      apiKey,
    });
  }

  public async getEvents(
    chainId: ChainEntity["chainId"],
    contract: ethers.Contract,
    filter: ethers.EventFilter,
    fromBlock: number,
    toBlock?: number,
  ): Promise<ExternalBlockchainApiEvent[]> {
    const abiObject = JSON.parse(
      contract.interface.format(ethers.utils.FormatTypes.json) as string,
    );

    const topic = filter.topics[0] as string;

    const events: ExternalBlockchainApiEvent[] = [];

    const limit = 100;
    let offset = 0;

    while (true) {
      const response = await Moralis.EvmApi.events.getContractEvents({
        chain: chainId,
        address: contract.address,
        abi: abiObject,
        fromBlock,
        toBlock,
        topic,
        offset,
        limit,
        disableTotal: true,
      });

      console.log(response);

      // events.push(
      //   response.result.map((event) => ({
      //     contractAddress: event.address.format(),
      //     txHash: event.transactionHash,
      //     blockNumber: Number(event.blockNumber.toString()),
      //     chainId: chainId,
      //     data: JSON.stringify(event.data),
      //   })),
      // );

      if (!response.hasNext) {
        break;
      } else {
        offset += limit;
      }
    }

    return events;
  }
}
