import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as Joi from "joi";
import { CONFIG } from "src/constants";

const config = registerAs(
  CONFIG.DATABASE,
  (): TypeOrmModuleOptions => ({
    type: process.env.DB_TYPE as "mysql" | "mariadb",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    entities: ["**/*.entity.js"],
    synchronize: process.env.MODE === "development",
    logging: process.env.MODE === "development",
    bigNumberStrings: false,
  }),
);

const validation = {
  DB_TYPE: Joi.string().valid("mysql", "mariadb").required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().allow("").required(),
  DB_DATABASE_NAME: Joi.string().required(),
  MODE: Joi.string().valid("development", "production").required(),
};

export const databaseConfig = {
  config,
  validation,
};
