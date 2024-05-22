import { Router } from 'express';
import userRouter from './user-router.js';
import taskRouter from './task-router.js';
import tokenRouter from './token-router.js';

const router = Router();

router.use('/user', userRouter);
router.use('/task', taskRouter);
router.use('/token', tokenRouter)

export default router;
