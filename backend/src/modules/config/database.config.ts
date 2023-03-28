import { registerAs } from "@nestjs/config";
import * as Joi from "joi";

import { CONFIG } from "src/constants";

const config = registerAs(CONFIG.DATABASE, () => ({
  DB_TYPE: process.env.DB_TYPE,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: Number(process.env.DB_PORT),
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE_NAME: process.env.DB_DATABASE_NAME,
  DB_SCHEMA: process.env.DB_SCHEMA,
}));

const validation = {
  DB_TYPE: Joi.string()
    .valid("mysql", "mariadb", "sqlite", "postgres")
    .required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().allow("").required(),
  DB_DATABASE_NAME: Joi.string().required(),
  DB_SCHEMA: Joi.string().required(),
};

export const databaseConfig = {
  config,
  validation,
};
