import { BoostsCollection } from '../db/models/boost.js';
import { SkinsCollection } from '../db/models/skin.js';
import { UsersCollection } from '../db/models/user.js';
import createHttpError from 'http-errors';
import { beginCell } from '@ton/ton';
import { toNano } from '@ton/ton';
import { env } from '../utils/env.js';
import { bot } from '../utils/initTgBot.js';
import axios from 'axios';

export const successPaymentService = async (memo) => {
  const parts = memo.split('_');

  const userId = Number(parts[1]);
  const collectionId = Number(parts[2]);
  const itemId = Number(parts[3]);

  if (collectionId === 1) {
    const skin = await SkinsCollection.findOne({ id: itemId });

    if (!skin) {
      throw createHttpError(404, 'Skin not found!');
    }

    const user = await UsersCollection.findOneAndUpdate(
      { id: userId },
      { $push: { skins: skin } },
      { new: true },
    );

    return user;
  }
  if (collectionId === 2) {
    const boostsArray = await BoostsCollection.findOne();

    const boosts = [
      ...boostsArray.boosts[0].common,
      ...boostsArray.boosts[1].special,
    ];

    const boost = boosts.find((boost) => boost.idItem === itemId);

    if (!boost) {
      throw createHttpError(404, 'Boost not found!');
    }

    const boostWithQuantity = { ...boost, quantity: 1 };

    const user = await UsersCollection.findOneAndUpdate(
      { id: userId },
      [
        {
          $set: {
            boosts: {
              $cond: {
                if: { $in: [itemId, '$boosts.idItem'] },
                then: {
                  $map: {
                    input: '$boosts',
                    as: 'boost',
                    in: {
                      $cond: {
                        if: { $eq: ['$$boost.idItem', itemId] },
                        then: {
                          $mergeObjects: [
                            '$$boost',
                            { quantity: { $add: ['$$boost.quantity', 1] } },
                          ],
                        },
                        else: '$$boost',
                      },
                    },
                  },
                },
                else: { $concatArrays: ['$boosts', [boostWithQuantity]] },
              },
            },
          },
        },
      ],
      { new: true },
    );

    return user;
  }
  if (collectionId === 5 && itemId === 5) {
    await UsersCollection.findOneAndUpdate(
      { id: userId },
      { farmingCycle: 12 },
      { new: true },
    );
  }
  if (collectionId === 5 && itemId === 6) {
    await UsersCollection.findOneAndUpdate(
      { id: userId },
      { farmingCycle: 24 },
      { new: true },
    );
  }

  return { message: 'Unknown collection!' };
};

// memo ex : ORDER_3423432_2_32
// перше число - id юзера, друге - id колекції (1 - скіни, 2 - бусти, 3 - пресейл, 4 - кейси, 5 - боти), третє - id кокретного бонуса в колекції

// ОБРОБКА ПРЕСЕЙЛУ!!!!

export const formTransactionService = async (
  userId,
  idCollection,
  idItem,
  amount,
) => {
  const body = beginCell()
    .storeUint(0, 32)
    .storeStringTail(`ORDER_${userId}_${idCollection}_${idItem}`)
    .endCell();

  const transaction = {
    validUntil: Math.floor(Date.now() / 1000) + 300,
    messages: [
      {
        address: env('ADDRESS_TO_PAYMENT'),
        amount: toNano(amount).toString(),
        payload: body.toBoc().toString('base64'),
      },
    ],
  };

  return transaction;
};

export const createStarInvoiceService = async (
  title,
  description,
  payload,
  currency,
  prices,
) => {
  const invoice = await bot.telegram.createInvoiceLink({
    title,
    description,
    payload,
    currency,
    prices,
    need_name: false,
    need_phone_number: false,
    need_email: false,
    need_shipping_address: false,
    is_flexible: false,
  });

  return invoice;
};

export const takeFullInfoAboutTransaction = async (hash) => {
  const data = await axios.get(
    `${env('TONAPI_URL')}/blockchain/transactions/${hash}`,
    {
      headers: { Authorization: `Bearer ${env('TONAPI_KEY')}` },
    },
  );

  const memo = data.data.in_msg.decoded_body.text;
  return memo;
};

export const writeOffTokensInPhenerium = async (amount, memo) => {
  const parts = memo.split('_');

  const userId = Number(parts[1]);

  const user = await UsersCollection.findOne({ id: userId });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  if (user.tokens < amount) {
    throw createHttpError(400, 'Insufficient tokens');
  }

  await UsersCollection.findOneAndUpdate(
    { id: userId },
    { $inc: { tokens: -amount } },
    { new: true },
  );
};
