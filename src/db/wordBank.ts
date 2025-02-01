import { mysqlDB } from './db';
import mysql, { ResultSetHeader } from 'mysql2/promise';
export interface WordBank {
  id: number;
  userId: number;
  name: string;
  words: string[];
  createdAt: Date;
}

export async function createWordBankDB(
  user_id: number,
  name: string
): Promise<WordBank | null> {
  try {
    const [results] = await mysqlDB.query<ResultSetHeader>(
      'Insert into wordBanks (user_id,name) values (?,?)',
      [user_id, name]
    );

    if (results.affectedRows === 0) return null;

    const [rows] = await mysqlDB.query<mysql.RowDataPacket[]>(
      'SELECT * FROM wordBanks WHERE user_id = ? AND name = ?',
      [user_id, name]
    );

    return rows[0] as WordBank;
  } catch (error) {
    console.log('error creating user in db');
    console.log(error);
    return null;
  }
}

export async function getAllWordBanksByUserDB(
  user_id: number
): Promise<WordBank[] | null> {
  try {
    const [rows] = await mysqlDB.query<mysql.RowDataPacket[]>(
      'SELECT * FROM wordBanks WHERE user_id = ? ',
      [user_id]
    );

    return rows as WordBank[];
  } catch (error) {
    console.log('error creating user in db');
    console.log(error);
    return null;
  }
}

export async function updateWordBankDB() {}

export async function deleteWordBankDB() {}
