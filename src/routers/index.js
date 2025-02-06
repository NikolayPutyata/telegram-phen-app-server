import { Router } from 'express';
import initUserRouter from './user.js';
import farmRouter from './farm.js';
import paymentRouter from './payment.js';

const router = Router();

router.use('/user', initUserRouter);
router.use('/farm', farmRouter);
router.use('/payment', paymentRouter);

export default router;
