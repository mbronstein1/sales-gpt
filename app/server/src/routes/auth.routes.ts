// Path: /api/auth
import { Router } from 'express';
import { login, signupAdmin } from '../controllers/auth.controller';

const router = Router();

router.post('/', login);
router.post('/signup/:companyName', signupAdmin);

export default router;
