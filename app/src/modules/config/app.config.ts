import { registerAs } from "@nestjs/config";
import * as Joi from "joi";
import { CONFIG } from "src/constants";

const config = registerAs(CONFIG.APP, () => ({
  PORT: Number(process.env.PORT),
  FRONTEND_URL: process.env.FRONTEND_URL,
  BACKEND_URL: process.env.BACKEND_URL,
  MODE: process.env.MODE,
}));

const validation = {
  PORT: Joi.number().required(),
  FRONTEND_URL: Joi.string().required(),
  BACKEND_URL: Joi.string().required(),
  MODE: Joi.string().valid("development", "production").required(),
};

export const appConfig = {
  config,
  validation,
};
