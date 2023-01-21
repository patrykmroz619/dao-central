import { Module } from "@nestjs/common";
import { ChainsModule } from "./chains/chains.module";
import { RpcProvidersModule } from './rpc-providers/rpc-providers.module';

@Module({
  imports: [ChainsModule, RpcProvidersModule],
})
export class BlockchainModule {}
