import { Module } from "@nestjs/common";
import { ChainsModule } from "./chains/chains.module";

@Module({
  imports: [ChainsModule],
})
export class BlockchainModule {}
