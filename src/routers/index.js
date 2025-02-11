import { Router } from 'express';
import initUserRouter from './user.js';
import farmRouter from './farm.js';
import paymentRouter from './payment.js';
import webhookBotRouter from './webhook.js';

const router = Router();

router.use('/user', initUserRouter);
router.use('/farm', farmRouter);
router.use('/payment', paymentRouter);
router.use('/webhook', webhookBotRouter);

export default router;
