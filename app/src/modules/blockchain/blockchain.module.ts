import { Module } from "@nestjs/common";
import { ChainsModule } from "./chains/chains.module";
import { RpcProvidersModule } from "./rpc-providers/rpc-providers.module";
import { NftModule } from './nft/nft.module';
import { ExternalBlockchainApiModule } from './external-blockchain-api/external-blockchain-api.module';

@Module({
  imports: [ChainsModule, RpcProvidersModule, NftModule, ExternalBlockchainApiModule],
  exports: [ChainsModule, RpcProvidersModule],
})
export class BlockchainModule {}
