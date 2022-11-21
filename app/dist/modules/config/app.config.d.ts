import * as Joi from "joi";
export declare const appConfig: {
    config: (() => {
        PORT: number;
        FRONTEND_URL: string;
        BACKEND_URL: string;
        MODE: string;
    }) & import("@nestjs/config").ConfigFactoryKeyHost<{
        PORT: number;
        FRONTEND_URL: string;
        BACKEND_URL: string;
        MODE: string;
    }>;
    validation: {
        PORT: Joi.NumberSchema<number>;
        FRONTEND_URL: Joi.StringSchema<string>;
        BACKEND_URL: Joi.StringSchema<string>;
        MODE: Joi.StringSchema<string>;
    };
};
