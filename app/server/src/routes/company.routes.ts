// path: /api/company
import { Router } from 'express';
import { permissionsMiddleware, superPermissionsMiddleware } from '../util/auth.util';
import {
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} from '../controllers/company.controller';

const router = Router();

router.get('/', superPermissionsMiddleware, getAllCompanies);
router.get('/:companyId', permissionsMiddleware, getCompanyById);
router.put('/:companyId', permissionsMiddleware, updateCompany);
router.delete('/:companyId', superPermissionsMiddleware, deleteCompany);

export default router;
