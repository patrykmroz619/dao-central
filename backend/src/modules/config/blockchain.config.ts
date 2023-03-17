import { registerAs } from "@nestjs/config";
import * as Joi from "joi";
import { CONFIG } from "src/constants";

const config = registerAs(CONFIG.BLOCKCHAIN, () => ({
  NFT_VOTING_FACTORY_ADDRESS: process.env.NFT_VOTING_FACTORY_ADDRESS,
}));

const validation = {
  NFT_VOTING_FACTORY_ADDRESS: Joi.string().required(),
};

export const blockchainConfig = { config, validation };
