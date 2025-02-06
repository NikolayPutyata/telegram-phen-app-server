import { Router } from 'express';
import { paymentSuccessController } from '../controllers/payment.js';

const router = Router();

router.post('/payment-success', paymentSuccessController);

export default router;
