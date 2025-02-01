export interface WordBank {
  id: number;
  userId: number;
  name: string;
  words: string[];
  createdAt: Date;
  updatedAt: Date;
}

export async function createWordBankDB() {}

export async function deleteWordBankDB() {}

export async function updateWordBankDB() {}

export async function getAllWordBanksByUserDB() {}
