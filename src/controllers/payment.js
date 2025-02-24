import {
  createStarInvoiceService,
  formTransactionService,
  takeFullInfoAboutTransaction,
  successPaymentService,
} from '../services/payments.js';

export const paymentSuccessController = async (req, res) => {
  const data = req.body;

  const memo = await takeFullInfoAboutTransaction(data.tx_hash);
  await successPaymentService(memo);

  res.status(200).send('OK');
};

export const formTransactionController = async (req, res) => {
  const { userId, idCollection, idItem, amount } = req.body;

  const transaction = await formTransactionService(
    userId,
    idCollection,
    idItem,
    amount,
  );

  res.status(200).json({ data: transaction });
};

export const createStarInvoiceController = async (req, res) => {
  const { title, description, payload, currency, prices } = req.body;

  const invoiceLink = await createStarInvoiceService(
    title,
    description,
    payload,
    currency,
    prices,
  );

  res.status(200).json({ data: invoiceLink });
};
