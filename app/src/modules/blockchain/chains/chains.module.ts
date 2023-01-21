import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChainsController } from "./chains.controller";
import { ChainEntity } from "./chains.entity";
import { ChainsService } from "./chains.service";

@Module({
  imports: [TypeOrmModule.forFeature([ChainEntity])],
  providers: [ChainsService],
  exports: [ChainsService],
  controllers: [ChainsController],
})
export class ChainsModule {}
