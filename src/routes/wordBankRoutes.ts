import { authenticateToken } from '../middleware/jwt';
import { Router } from 'express';
import {
  createWordBank,
  deleteWordBank,
  getAllWordBanksByUser,
  updateWordBank,
} from '../controller/wordBankController';

const router = Router();

router.post('/user/:id', authenticateToken, createWordBank);
router.get('/user/:id', authenticateToken, getAllWordBanksByUser);
router.patch('/:id/user/:user_id', authenticateToken, updateWordBank);
router.delete('/:id/user/:user_id', authenticateToken, deleteWordBank);

export default router;
