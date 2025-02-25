import { Router } from 'express';
import {
  createStarInvoiceController,
  formTransactionController,
  paymentSuccessController,
} from '../controllers/payment.js';

const router = Router();

router.post('/payment-success', paymentSuccessController);
router.post('/form-transaction', formTransactionController);
router.post('/create-star-invoice', createStarInvoiceController);

export default router;
