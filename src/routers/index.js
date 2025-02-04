import { Router } from 'express';
import initUserRouter from './user.js';

const router = Router();

router.use('/user', initUserRouter);

export default router;
