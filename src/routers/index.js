import authRouter from './auth.js';
import usersRouter from './users.js';
import boardsRouter from './boards.js'
import { Router } from 'express';

const router = Router();

router.use('/users', authRouter);
router.use('/boards', boardsRouter)
router.use('/users', usersRouter);

export default router;
