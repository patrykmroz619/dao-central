import { writeFileSync } from "fs";
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

        if (process.argv.includes("--export-typeorm-config")) {
          writeFileSync(
            config.get(CONFIG.APP_ROOT_DIR) + "/ormconfig.json",
            JSON.stringify(databaseConfig, null, 2),
          );
          process.exit(0);
        }

        return databaseConfig;
      },
    }),
  ],
})
export class DatabaseModule {}
