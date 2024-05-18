import { Router } from 'express';

import {
  createUser,
  getUsers,
  getUsersByCompanyId,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/users.controller';
import {
  authMiddleware,
  permissionsMiddleware,
  superPermissionsMiddleware,
} from '../util/auth.util';

const router = Router();

router.post('/:companyId', authMiddleware, permissionsMiddleware, createUser);
router.get('/', authMiddleware, superPermissionsMiddleware, getUsers);
router.get('/:companyId/:userId', authMiddleware, getUserById);
router.get('/:companyId', authMiddleware, permissionsMiddleware, getUsersByCompanyId);
router.put('/:companyId/:userId', authMiddleware, permissionsMiddleware, updateUser);
router.delete('/:companyId/:userId', authMiddleware, permissionsMiddleware, deleteUser);

export default router;
