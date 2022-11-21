import { registerAs } from "@nestjs/config";
import * as Joi from "joi";

const config = registerAs("app", () => ({
  port: Number(process.env.PORT),
  frontendUrl: process.env.FRONTEND_URL,
  backendUrl: process.env.BACKEND_URL,
  mode: process.env.MODE,
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
