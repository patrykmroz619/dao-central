import { registerAs } from "@nestjs/config";
import * as Joi from "joi";
import { CONFIG } from "src/constants";

const config = registerAs(CONFIG.CREDENTIALS, () => ({
  MORALIS_API_KEY: process.env.MORALIS_API_KEY,
  ADMIN_API_KEY: process.env.ADMIN_API_KEY,
}));

const validation = {
  MORALIS_API_KEY: Joi.string().required(),
  ADMIN_API_KEY: Joi.string().required(),
};

export const credentialsConfig = { config, validation };
