import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createStarInvoiceController,
  formTransactionController,
  paymentSuccessController,
} from '../controllers/payment.js';

const router = Router();

router.post('/payment-success', ctrlWrapper(paymentSuccessController));
router.post('/form-transaction', ctrlWrapper(formTransactionController));
router.post('/create-star-invoice', ctrlWrapper(createStarInvoiceController));

export default router;
