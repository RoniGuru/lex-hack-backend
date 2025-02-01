import { Router } from 'express';
import {
  getUserById,
  getToken,
  register,
  login,
  logout,
  updateUser,
  deleteUser,
} from '../controller/userController';
import { authenticateToken } from '../middleware/jwt';

const router = Router();
router.post('/token/:id', getToken);

router.get('/:id', authenticateToken, getUserById);
router.delete('/delete/:id', authenticateToken, deleteUser);

router.post('/register', register);
router.post('/login', login);
router.post('/logout/:id', logout);

router.post('/update/:id', authenticateToken, updateUser);

export default router;
