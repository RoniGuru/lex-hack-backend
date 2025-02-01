import { authenticateToken } from '../middleware/jwt';
import { Router } from 'express';
import { createWordBank } from '../controller/wordBankController';

const router = Router();

router.post('/:id', authenticateToken, createWordBank);

export default router;
