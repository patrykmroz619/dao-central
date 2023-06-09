import { Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import * as Joi from "joi";

import { NODE_ENV } from "src/constants";
import { appConfig } from "./app.config";
import { blockchainConfig } from "./blockchain.config";
import { credentialsConfig } from "./credentials.config";
import { databaseConfig } from "./database.config";
import { jwtConfig } from "./jwt.config";

const getEnvFilePath = () => {
  switch (process.env.NODE_ENV) {
    case NODE_ENV.DEVELOPMENT:
    case NODE_ENV.PRODUCTION:
      return ".env";
    case NODE_ENV.TEST:
      return ".env.test";
    default:
      throw new Error("Invalid NODE_ENV variable");
  }
};

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [
        appConfig.config,
        databaseConfig.config,
        jwtConfig.config,
        credentialsConfig.config,
        blockchainConfig.config,
      ],
      validationSchema: Joi.object({
        ...appConfig.validation,
        ...databaseConfig.validation,
        ...jwtConfig.validation,
        ...credentialsConfig.validation,
        ...blockchainConfig.validation,
      }),
      isGlobal: true,
      envFilePath: getEnvFilePath(),
    }),
  ],
})
export class ConfigModule {}
