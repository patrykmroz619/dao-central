import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as Joi from "joi";
import { CONFIG, NODE_ENV } from "src/constants";

const config = registerAs(
  CONFIG.DATABASE,
  (): TypeOrmModuleOptions => ({
    type: process.env.DB_TYPE as "mysql" | "mariadb",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    entities:
      process.env.NODE_ENV === NODE_ENV.TEST
        ? ["**/*.entity.{ts,js}"]
        : ["dist/**/*.entity.{ts,js}"],
    synchronize: process.env.NODE_ENV !== NODE_ENV.PRODUCTION,
    logging: process.env.NODE_ENV === NODE_ENV.DEVELOPMENT,
    bigNumberStrings: false,
  }),
);

const validation = {
  DB_TYPE: Joi.string().valid("mysql", "mariadb", "sqlite").required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().allow("").required(),
  DB_DATABASE_NAME: Joi.string().required(),
};

export const databaseConfig = {
  config,
  validation,
};
