// path: /api
import { Router } from 'express';
import authRouter from './auth.routes';
import userRouter from './users.routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);

router.get('/', (req, res) => {
  res.send('API is up and running!');
});

export default router;
