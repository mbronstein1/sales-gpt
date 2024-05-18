// path: /api
import { Router } from 'express';
import authRouter from './auth.routes';
import userRouter from './users.routes';
import gptRouter from './gpt.routes';
import { authMiddleware } from '../util/auth.util';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', authMiddleware, userRouter);
router.use('/gpt', authMiddleware, gptRouter);

router.get('/', (req, res) => {
  res.send('API is up and running!');
});

export default router;
