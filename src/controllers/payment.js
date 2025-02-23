import {
  formTransactionService,
  successPaymentService,
} from '../services/payments.js';

export const paymentSuccessController = async (req, res) => {
  const data = req.body;

  const transactionId = data.signature;
  const sender = data.accountData[0].account;
  const memo = data.memo;

  // якщо приходить отак
  //   {
  //     "signature": "4324321230",
  //     "accountData": [
  //         {"account": "4qEQnt1BXPgBGXVs3pcnspAAit9f44147bDvLUkveHRw"}
  //     ],
  //     "memo": "ORDER_65600001_2_32"

  // }

  const user = await successPaymentService(transactionId, sender, memo);

  res.status(200).json({ id: user.id });
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
