import mysql from 'mysql2/promise';

import dotenv from 'dotenv';

dotenv.config();
export const mysqlDB = mysql.createPool({
  host: 'localhost',
  user: process.env.LOCAL_USERNAME,
  password: process.env.LOCAL_PASSWORD,
  waitForConnections: true,
});
