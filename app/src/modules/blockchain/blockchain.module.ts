import { Module } from "@nestjs/common";
import { ChainsModule } from "./chains/chains.module";
import { RpcProvidersModule } from "./rpc-providers/rpc-providers.module";
import { EventsCrawlerModule } from "./events-crawler/events-crawler.module";
import { ExternalBlockchainApiModule } from "./external-blockchain-api/external-blockchain-api.module";

@Module({
  imports: [
    ChainsModule,
    RpcProvidersModule,
    EventsCrawlerModule,
    ExternalBlockchainApiModule,
  ],
})
export class BlockchainModule {}
