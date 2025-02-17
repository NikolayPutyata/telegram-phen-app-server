import { BoostsCollection } from '../db/models/boost.js';
import { SkinsCollection } from '../db/models/skin.js';
import { UsersCollection } from '../db/models/user.js';
import createHttpError from 'http-errors';

export const successPaymentService = async (transactionId, sender, memo) => {
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
    const boost = await BoostsCollection.findOne({ id: itemId });

    if (!boost) {
      throw createHttpError(404, 'Boost not found!');
    }

    const user = await UsersCollection.findOneAndUpdate(
      { id: userId },
      { $push: { boosts: boost } },
      { new: true },
    );

    return user;
  }

  return { message: 'Unknown collection!' };
};

// memo ex : ORDER_3423432_1_32
// перше число - id юзера, друге - id колекції (1 - скіни, 2 - бусти, 3 - пресейл), третє - id кокретного бонуса в колекції

// ОБРОБКА ПРЕСЕЙЛУ!!!!
