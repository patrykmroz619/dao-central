import { Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import * as Joi from "joi";
import { appConfig } from "./app.config";
import { databaseConfig } from "./database.config";

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [appConfig.config, databaseConfig.config],
      validationSchema: Joi.object({
        ...appConfig.validation,
        ...databaseConfig.validation,
      }),
      isGlobal: true,
    }),
  ],
})
export class ConfigModule {}
