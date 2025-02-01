import dotenv from 'dotenv';
import { Response, Request } from 'express';
import { createWordBankDB, getAllWordBanksByUserDB } from '../db/wordBank';

dotenv.config();

export async function createWordBank(req: Request, res: Response) {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ error: 'please provide a name' });
      return;
    }

    const result = await createWordBankDB(Number(req.params.id), name);
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

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'failed to get all word banks' });
  }
}
