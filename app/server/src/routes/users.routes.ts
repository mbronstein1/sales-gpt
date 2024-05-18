// Path: /api/users
import { Router } from 'express';
import {
  createUser,
  getUsers,
  getUsersByCompanyId,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/users.controller';
import { permissionsMiddleware, superPermissionsMiddleware } from '../util/auth.util';

const router = Router();

router.post('/:companyId', permissionsMiddleware, createUser);
router.get('/', superPermissionsMiddleware, getUsers);
router.get('/:companyId/:userId', getUserById);
router.get('/:companyId', permissionsMiddleware, getUsersByCompanyId);
router.put('/:companyId/:userId', permissionsMiddleware, updateUser);
router.delete('/:companyId/:userId', permissionsMiddleware, deleteUser);

export default router;
