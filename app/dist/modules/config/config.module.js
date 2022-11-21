"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const Joi = require("joi");
const app_config_1 = require("./app.config");
const database_config_1 = require("./database.config");
let ConfigModule = class ConfigModule {
};
ConfigModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [app_config_1.appConfig.config, database_config_1.databaseConfig.config],
                validationSchema: Joi.object(Object.assign(Object.assign({}, app_config_1.appConfig.validation), database_config_1.databaseConfig.validation)),
                isGlobal: true,
            }),
        ],
    })
], ConfigModule);
exports.ConfigModule = ConfigModule;
//# sourceMappingURL=config.module.js.map