import authRouter from './auth.js';
import waterRouter from './water.js';
import usersRouter from './users.js';
// import authRouter from './auth.js'
import { Router } from 'express';

const router = Router();

router.use('/users', authRouter);
router.use('/water', waterRouter);
router.use('/users', usersRouter);

export default router;
