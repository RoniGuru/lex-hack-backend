import { Router } from 'express';
import {
  getUserById,
  getToken,
  logout,
  updateUser,
  deleteUser,
} from '../controller/userController';
import { authenticateToken } from '../middleware/jwt';

const router = Router();
router.post('/token/:id', getToken);

router.get('/:id', authenticateToken, getUserById);
router.delete('/:id', authenticateToken, deleteUser);

router.post('/logout/:id', logout);

router.patch('/:id', authenticateToken, updateUser);

export default router;
