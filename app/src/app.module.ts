import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

import { ConfigModule } from "./modules/config/config.module";
import { DatabaseModule } from "./modules/database/database.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { BlockchainModule } from "./modules/blockchain/blockchain.module";
import { DaoModule } from "./modules/dao/dao.module";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
    BlockchainModule,
    DaoModule,
  ],
})
export class AppModule {}
