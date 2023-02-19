import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ethers } from "ethers";

import { CONFIG } from "src/constants";
import { nftVotingFactoryContractAbi } from "./abi";

@Injectable()
export class DaoService {
  private readonly logger = new Logger(DaoService.name);
  private factoryContract: ethers.Contract;

  constructor(private configService: ConfigService) {
    const nftVotingFactoryContractAddress = this.configService.get<string>(
      CONFIG.NFT_VOTING_FACTORY_ADDRESS,
    );

    this.factoryContract = new ethers.Contract(
      nftVotingFactoryContractAddress,
      nftVotingFactoryContractAbi,
    );
  }

  @Cron(CronExpression.EVERY_MINUTE)
  public discoverDAOs() {
    this.logger.debug("Called every minute");
  }
}
