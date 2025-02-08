"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mysqlDB = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
const environment = process.env.NODE_ENV || 'development';
dotenv_1.default.config({
    path: environment === 'production' ? '.env.production' : '.env.development',
});
const baseConfig = {
    waitForConnections: true,
    connectionLimit: 100,
};
const envConfig = {
    development: {
        host: process.env.DEV_DB_HOST,
        user: process.env.DEV_DB_USER,
        password: process.env.DEV_DB_PASSWORD,
        database: process.env.DEV_DB_NAME,
    },
    production: {
        host: process.env.PROD_DB_HOST,
        user: process.env.PROD_DB_USER,
        password: process.env.PROD_DB_PASSWORD,
        database: process.env.PROD_DB_NAME,
    },
};
const config = Object.assign(Object.assign({}, baseConfig), envConfig[environment === 'production' ? 'production' : 'development']);
exports.mysqlDB = promise_1.default.createPool(config);
