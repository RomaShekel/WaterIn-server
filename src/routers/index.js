import authRouter from './auth.js';
import waterRouter from './water.js';
import usersRouter  from './users.js';
import { Router } from 'express';

const router = Router();

router.use('/water', waterRouter);
router.use('/users', usersRouter);
router.use('/users', authRouter);

export default router;