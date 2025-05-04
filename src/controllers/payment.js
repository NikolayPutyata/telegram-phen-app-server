import {
  createStarInvoiceService,
  formTransactionService,
  takeFullInfoAboutTransaction,
  successPaymentService,
  writeOffTokensInPhenerium,
} from '../services/payments.js';
import { getCollectionItemService } from '../services/user.js';

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

export const paymentInPheneriumController = async (req, res) => {
  const amount = req.body.amount;
  const memo = req.body.memo;

  await writeOffTokensInPhenerium(amount, memo);
  const user = await successPaymentService(memo);

  res.status(200).json({
    data: { tokens: user.tokens, skins: user.skins, boosts: user.boosts },
  });
};

export const buySkinInPheneriumController = async (req, res) => {
  const amount = req.body.amount;
  const memo = req.body.memo;
  const parts = memo.split('_');
  const userId = Number(parts[1]);
  const colId = Number(parts[2]);
  const index = Number(parts[3]);

  await writeOffTokensInPhenerium(amount, memo);

  const user = await getCollectionItemService(userId, colId, index);

  res
    .status(200)
    .json({ skinsCollection: user.skinsCollections, tokens: user.tokens });
};
