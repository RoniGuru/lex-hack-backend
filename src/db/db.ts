import mysql from 'mysql2/promise';

import dotenv from 'dotenv';

const environment = process.env.NODE_ENV || 'development';

dotenv.config({
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

const config = {
  ...baseConfig,
  ...envConfig[environment === 'production' ? 'production' : 'development'],
};

export const mysqlDB = mysql.createPool(config);
