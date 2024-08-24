import authRouter from './auth.js';
import usersRouter from './users.js';
import boardsRouter from './boards.js'
import columnRouter from './columns.js'
import cardsRouter from './card.js'
import { Router } from 'express';

const router = Router();

router.use('/users', authRouter);
router.use('/users', usersRouter);
router.use('/boards', boardsRouter)
router.use('/columns', columnRouter)
router.use('/cards', cardsRouter)

export default router;
