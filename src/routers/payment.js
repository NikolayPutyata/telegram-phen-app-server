import { Router } from 'express';
import {
  formTransactionController,
  paymentSuccessController,
} from '../controllers/payment.js';

const router = Router();

router.post('/payment-success', paymentSuccessController);
router.post('/form-transaction', formTransactionController);

export default router;
