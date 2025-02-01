import { authenticateToken } from '../middleware/jwt';
import { Router } from 'express';
import {
  createWordBank,
  getAllWordBanksByUser,
} from '../controller/wordBankController';

const router = Router();

router.post('/:id', authenticateToken, createWordBank);
router.get('/:id', authenticateToken, getAllWordBanksByUser);

export default router;
