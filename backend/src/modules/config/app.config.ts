import { registerAs } from "@nestjs/config";
import * as Joi from "joi";
import * as path from "path";

import { CONFIG, NODE_ENV } from "src/constants";

const config = registerAs(CONFIG.APP, () => ({
  PORT: Number(process.env.PORT),
  FRONTEND_URL: process.env.FRONTEND_URL,
  BACKEND_URL: process.env.BACKEND_URL,
  NODE_ENV: process.env.NODE_ENV,
  ROOT_DIR: path.join(__dirname, "../../"),
}));

const validation = {
  PORT: Joi.number().required(),
  FRONTEND_URL: Joi.string().required(),
  BACKEND_URL: Joi.string().required(),
  NODE_ENV: Joi.string()
    .valid(NODE_ENV.DEVELOPMENT, NODE_ENV.PRODUCTION, NODE_ENV.TEST)
    .required(),
};

export const appConfig = {
  config,
  validation,
};
