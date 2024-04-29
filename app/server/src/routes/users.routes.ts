import { Router } from 'express';

import {
  createUser,
  getUsers,
  getUsersByCompanyId,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/users.controller';

const router = Router();

router.post('/:companyId', createUser);
router.get('/', getUsers);
router.get('/:userId', getUserById);
router.get('/company/:companyId', getUsersByCompanyId);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

export default router;
