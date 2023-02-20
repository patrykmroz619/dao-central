import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { BlockchainModule } from "../blockchain/blockchain.module";
import { UsersModule } from "../users/users.module";
import { DaoEntity } from "./dao.entity";
import { DaoService } from "./dao.service";
import { DaoController } from "./dao.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([DaoEntity]),
    BlockchainModule,
    UsersModule,
  ],
  providers: [DaoService],
  controllers: [DaoController],
})
export class DaoModule {}
