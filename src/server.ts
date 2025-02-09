import cookieParser from 'cookie-parser';
import cors from 'cors';
import { mysqlDB } from './db/db';
import express, { Express } from 'express';
import userRouter from './routes/userRoutes';
import wordBanksRouter from './routes/wordBankRoutes';
import publicRoutes from './routes/publicRoutes';

import dotenv from 'dotenv';
const environment = process.env.NODE_ENV || 'development';
dotenv.config({
  path: environment === 'production' ? '.env.production' : '.env.development',
});

const app: Express = express();
const port = process.env.PORT || 3300;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://lexhack-frontend-s3.s3-website.eu-west-2.amazonaws.com',
  })
);

app.use('/', publicRoutes);
app.use('/v1/users', userRouter);
app.use('/v1/wordBanks', wordBanksRouter);

async function initializeDB() {
  console.log('Connected!');
  type NodeEnv = 'development' | 'production' | 'test';

  // Get the environment
  const environment: NodeEnv =
    (process.env.NODE_ENV as NodeEnv) || 'development';

  // Helper function to check environment
  const isDevelopment = (): boolean => environment === 'development';

  // Usage example
  if (isDevelopment()) {
    console.log('Running in development mode');
    await mysqlDB.query('DROP DATABASE IF EXISTS word_test');
    await mysqlDB.query('CREATE DATABASE word_test');
    await mysqlDB.query('USE word_test');
  } else {
    console.log('Running in production mode');
    await mysqlDB.query('CREATE DATABASE IF NOT EXISTS lex_prod');
    await mysqlDB.query('USE lex_prod');
  }

  await mysqlDB.query(
    'CREATE TABLE IF NOT EXISTS users (id INT  PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL,email VARCHAR(255) , refresh_token VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP )'
  );

  await mysqlDB.query(
    'CREATE TABLE IF NOT EXISTS wordBanks (id INT  PRIMARY KEY AUTO_INCREMENT, user_id INT NOT NULL, name VARCHAR(100) NOT NULL, words JSON ,FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, UNIQUE KEY unique_bank_name (user_id, name)) '
  );
}

app.listen(port, async () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);

  await initializeDB();
});
