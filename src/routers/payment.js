import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createStarInvoiceController,
  formTransactionController,
  paymentSuccessController,
} from '../controllers/payment.js';
import {
  paymentSuccessSchema,
  formTransactionSchema,
  createStarInvoiceSchema,
} from '../validation/payment.js';

const router = Router();

router.post(
  '/payment-success',
  validateBody(paymentSuccessSchema),
  ctrlWrapper(paymentSuccessController),
);
router.post(
  '/form-transaction',
  validateBody(formTransactionSchema),
  ctrlWrapper(formTransactionController),
);
router.post(
  '/create-star-invoice',
  validateBody(createStarInvoiceSchema),
  ctrlWrapper(createStarInvoiceController),
);

export default router;
