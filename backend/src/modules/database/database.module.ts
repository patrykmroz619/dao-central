import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CONFIG } from "src/constants";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const databaseConfig = config.get(CONFIG.DATABASE);
        return databaseConfig;
      },
    }),
  ],
})
export class DatabaseModule {}
