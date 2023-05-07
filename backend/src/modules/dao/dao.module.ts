import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { BlockchainModule } from "../blockchain/blockchain.module";
import { UsersModule } from "../users/users.module";

import { DiscoverUnsavedDaosService } from "./domain/application/discover-unsaved-daos.service";
import { RegisterDaoService } from "./domain/application/register-dao.service";
import { GetDaoService } from "./domain/application/get-dao.service";
import { ChainsRepositoryPortToken } from "./domain/ports/chains-repository.port";
import { DaoContractsRepositoryPortToken } from "./domain/ports/dao-contracts-repository.port";
import { DaosRepositoryToken } from "./domain/ports/daos-repository.port";

import { DaoEntity } from "./infrastructure/entities/dao.entity";
import { DaoExtraLinkEntity } from "./infrastructure/entities/dao-extra-links.entity";
import { DaoContractsRepository } from "./infrastructure/repositories/dao-contracts.repository";
import { ChainsRepository } from "./infrastructure/repositories/chains.repository";
import { DaoRepository } from "./infrastructure/repositories/dao.repository";

import { DaoController } from "./presentation/rest/dao.controller";
import { DiscoverDaoCron } from "./presentation/crons/discover-dao.cron";

@Module({
  imports: [
    TypeOrmModule.forFeature([DaoEntity, DaoExtraLinkEntity]),
    BlockchainModule,
    UsersModule,
  ],
  providers: [
    { provide: ChainsRepositoryPortToken, useClass: ChainsRepository },
    {
      provide: DaosRepositoryToken,
      useClass: DaoRepository,
    },
    {
      provide: DaoContractsRepositoryPortToken,
      useClass: DaoContractsRepository,
    },
    DiscoverUnsavedDaosService,
    RegisterDaoService,
    GetDaoService,
    DiscoverDaoCron,
  ],
  controllers: [DaoController],
})
export class DaoModule {}
