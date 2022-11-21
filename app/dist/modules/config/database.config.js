"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const config_1 = require("@nestjs/config");
const Joi = require("joi");
const constants_1 = require("../../constants");
const config = (0, config_1.registerAs)(constants_1.CONFIG.DATABASE, () => ({
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    entities: ["**/*.entity.js"],
    synchronize: process.env.MODE === "development",
    logging: process.env.MODE === "development",
    bigNumberStrings: false,
}));
const validation = {
    DB_TYPE: Joi.string().valid("mysql", "mariadb").required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().allow("").required(),
    DB_DATABASE_NAME: Joi.string().required(),
    MODE: Joi.string().valid("development", "production").required(),
};
exports.databaseConfig = {
    config,
    validation,
};
//# sourceMappingURL=database.config.js.map