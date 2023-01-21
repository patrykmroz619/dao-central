import { Module } from "@nestjs/common";
import { ChainsModule } from "./chains/chains.module";
import { RpcProvidersModule } from './rpc-providers/rpc-providers.module';
import { EventsCrawlerModule } from './events-crawler/events-crawler.module';

@Module({
  imports: [ChainsModule, RpcProvidersModule, EventsCrawlerModule],
})
export class BlockchainModule {}
