import authRouter from './auth.js';
import waterRouter from './water.js';
import usersRouter from './users.js';
import { Router } from 'express';
import { refreshServerController } from '../controllers/serverRefresh.js';

const router = Router();

router.get('/server-refresh', refreshServerController)
router.use('/users', authRouter);
router.use('/water', waterRouter);
router.use('/users', usersRouter);

export default router;
