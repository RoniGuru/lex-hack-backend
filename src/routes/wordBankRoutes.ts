import { authenticateToken } from '../middleware/jwt';
import { Router } from 'express';
import {
  createWordBank,
  getAllWordBanksByUser,
  updateWordBank,
} from '../controller/wordBankController';

const router = Router();

router.post('/user/:id', authenticateToken, createWordBank);
router.get('/user/:id', authenticateToken, getAllWordBanksByUser);
router.patch('/:id/user/:user_id', authenticateToken, updateWordBank);

export default router;
