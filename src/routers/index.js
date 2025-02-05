import { Router } from 'express';
import initUserRouter from './user.js';
// import farmRouter from './farm.js';

const router = Router();

router.use('/user', initUserRouter);
// router.use('/farm', farmRouter);

export default router;
