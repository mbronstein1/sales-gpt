import { Router } from 'express';
import { permissionsMiddleware, superPermissionsMiddleware } from '../util/auth.util';
import {
  createContent,
  deleteContent,
  getAllContent,
  getAllContentByCompanyId,
  getContentById,
  getContentByCompanyId,
  updateContent,
} from '../controllers/content.controller';

const router = Router();

router.get('/', superPermissionsMiddleware, getAllContent);
router.get('/:contentId', superPermissionsMiddleware, getContentById);
router.get('/all/:companyId', permissionsMiddleware, getAllContentByCompanyId);
router.get('/:companyId/:contentId', permissionsMiddleware, getContentByCompanyId);
router.post('/:companyId', permissionsMiddleware, createContent);
router.put('/:companyId/:contentId', permissionsMiddleware, updateContent);
router.delete('/:companyId/:contentId', permissionsMiddleware, deleteContent);

export default router;
