import { Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import * as Joi from "joi";
import { appConfig } from "./app.config";

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [appConfig.config],
      validationSchema: Joi.object({
        ...appConfig.validation,
      }),
      isGlobal: true,
    }),
  ],
})
export class ConfigModule {}
