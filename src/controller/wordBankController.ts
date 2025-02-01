import dotenv from 'dotenv';
import { Response, Request } from 'express';
import {
  updateWordBankWordsDB,
  createWordBankDB,
  getAllWordBanksByUserDB,
  updateWordBankNameDB,
} from '../db/wordBank';

dotenv.config();

export async function createWordBank(req: Request, res: Response) {
  try {
    const { name } = req.body;
    const id = Number(req.params.id);
    if (!id) {
      res.status(400).json({ error: 'no id' });
      return;
    }

    if (!name) {
      res.status(400).json({ error: 'please provide a name' });
      return;
    }

    const result = await createWordBankDB(id, name);
    if (!result) {
      res.status(400).json({ error: 'word Bank not created' });
      return;
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'failed to create word Bank' });
  }
}

export async function getAllWordBanksByUser(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (!id) {
      res.status(400).json({ error: 'no id' });
      return;
    }

    const result = await getAllWordBanksByUserDB(id);

    res.status(200).json({ wordBanks: result });
  } catch (error) {
    res.status(500).json({ error: 'failed to get all word banks' });
  }
}

export async function updateWordBank(req: Request, res: Response) {
  try {
    const user_id = Number(req.params.user_id);
    const id = Number(req.params.id);

    const { addedWords, newName } = req.body;
    if (!user_id || !id) {
      res.status(400).json({ error: 'no id' });
      return;
    }

    if (newName) {
      const result = await updateWordBankNameDB(id, user_id, newName);
      res.status(200).json(result);
      return;
    } else if (addedWords) {
      const result = await updateWordBankWordsDB(id, user_id, addedWords);
      res.status(200).json(result);
      return;
    }

    res.status(200).json(false);
  } catch (error) {
    res.status(500).json({ error: 'failed to update word bank' });
  }
}

export async function deleteWordBank() {}
