import { registerAs } from "@nestjs/config";
import * as Joi from "joi";
import { CONFIG } from "src/constants";

const config = registerAs(CONFIG.JWT, () => ({
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXP: Number(process.env.JWT_ACCESS_TOKEN_EXP),
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_EXP: Number(process.env.JWT_REFRESH_TOKEN_EXP),
}));

const validation = {
  JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
  JWT_ACCESS_TOKEN_EXP: Joi.number().required(),
  JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
  JWT_REFRESH_TOKEN_EXP: Joi.number().required(),
};

export const jwtConfig = { config, validation };
