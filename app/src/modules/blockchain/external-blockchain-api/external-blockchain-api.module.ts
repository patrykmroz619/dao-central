import { Module } from "@nestjs/common";
import { ExternalBlockchainApiService } from "./external-blockchain-api.service";

@Module({
  providers: [ExternalBlockchainApiService],
})
export class ExternalBlockchainApiModule {}
