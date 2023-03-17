import { Module } from "@nestjs/common";

import { NftService } from "./nft.service";
import { NftController } from "./nft.controller";
import { ExternalBlockchainApiModule } from "../external-blockchain-api/external-blockchain-api.module";

@Module({
  providers: [NftService],
  controllers: [NftController],
  imports: [ExternalBlockchainApiModule],
})
export class NftModule {}
