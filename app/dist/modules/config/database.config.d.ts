import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as Joi from "joi";
export declare const databaseConfig: {
    config: (() => TypeOrmModuleOptions) & import("@nestjs/config").ConfigFactoryKeyHost<TypeOrmModuleOptions>;
    validation: {
        DB_TYPE: Joi.StringSchema<string>;
        DB_HOST: Joi.StringSchema<string>;
        DB_PORT: Joi.NumberSchema<number>;
        DB_USERNAME: Joi.StringSchema<string>;
        DB_PASSWORD: Joi.StringSchema<string>;
        DB_DATABASE_NAME: Joi.StringSchema<string>;
        MODE: Joi.StringSchema<string>;
    };
};
