import cookieParser from 'cookie-parser';
import cors from 'cors';
import { mysqlDB } from './db/db';
import express, { Express } from 'express';
import userRouter from './routes/userRoutes';
import wordBanksRouter from './routes/wordBankRoutes';

const app: Express = express();
const port = process.env.PORT || 3300;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/v1/users', userRouter);
app.use('/v1/wordBanks', wordBanksRouter);

async function initializeDB() {
  console.log('Connected!');

  // await mysqlDB.query('DROP TABLE IF EXISTS users');
  await mysqlDB.query('DROP DATABASE IF EXISTS word_test');

  await mysqlDB.query('CREATE DATABASE word_test');
  await mysqlDB.query('USE word_test');
  await mysqlDB.query(
    'CREATE TABLE IF NOT EXISTS users (id INT  PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL,email VARCHAR(255) , refresh_token VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP )'
  );

  await mysqlDB.query(
    'CREATE TABLE IF NOT EXISTS wordBanks (id INT  PRIMARY KEY AUTO_INCREMENT, user_id INT NOT NULL, name VARCHAR(100) NOT NULL, words JSON ,FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, UNIQUE KEY unique_bank_name (user_id, name)) '
  );
}

app.listen(port, async () => {
  console.log(`[server]: Server is running at http://localhost:${port}sssddd`);

  await initializeDB();
});
