import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

import { ConfigModule } from "./modules/config/config.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { BlockchainModule } from "./modules/blockchain/blockchain.module";
import { DaoModule } from "./modules/dao/dao.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceOptions } from "db/data-source";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({ ...dataSourceOptions }),
    ConfigModule,
    AuthModule,
    UsersModule,
    BlockchainModule,
    DaoModule,
  ],
})
export class AppModule {}
