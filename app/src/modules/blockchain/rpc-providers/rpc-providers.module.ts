import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ChainsModule } from "../chains/chains.module";
import { RpcProvidersService } from "./rpc-providers.service";
import { RpcProvidersController } from "./rpc-providers.controller";
import { RpcProviderEntity } from "./rpc-providers.entity";

@Module({
  imports: [ChainsModule, TypeOrmModule.forFeature([RpcProviderEntity])],
  exports: [RpcProvidersService],
  providers: [RpcProvidersService],
  controllers: [RpcProvidersController],
})
export class RpcProvidersModule {}
