import { Module } from "@nestjs/common";

import { ExternalBlockchainApiService } from "./external-blockchain-api.service";

@Module({
  providers: [ExternalBlockchainApiService],
  exports: [ExternalBlockchainApiService],
})
export class ExternalBlockchainApiModule {}
