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

export async function updateWordBankNameDB(
  id: number,
  user_id: number,
  name: string
) {
  try {
    const [results] = await mysqlDB.query<ResultSetHeader>(
      'UPDATE wordBanks SET name = ? WHERE id = ? AND user_id = ?',
      [name, id, user_id]
    );

    if (results.affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log('error updating word bank name in db');
    return false;
  }
}
export async function updateWordBankWordsDB(
  id: number,
  user_id: number,
  words: string[]
) {
  try {
    const wordsJson = JSON.stringify(words);

    const [results] = await mysqlDB.query<ResultSetHeader>(
      'UPDATE wordBanks SET words = ? WHERE id = ? AND user_id = ?',
      [wordsJson, id, user_id]
    );

    if (results.affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log('error updating word bank words in db');
    return false;
  }
}

export async function deleteWordBankDB() {}
