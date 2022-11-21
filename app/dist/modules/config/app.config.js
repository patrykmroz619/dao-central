"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
const config_1 = require("@nestjs/config");
const Joi = require("joi");
const constants_1 = require("../../constants");
const config = (0, config_1.registerAs)(constants_1.CONFIG.APP, () => ({
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
exports.appConfig = {
    config,
    validation,
};
//# sourceMappingURL=app.config.js.map