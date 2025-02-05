import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';
import { FARMING_TIME } from '../constants/index.js';

export const startFarming = async (id, price) => {
  const farmStart = Date.now();
  const farmEnd = farmStart + FARMING_TIME;

  const user = await UsersCollection.findOneAndUpdate(
    { id: id },
    { $set: { farmStart, farmEnd, currentPrice: price, isFarming: true } },
    { new: true },
  );

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  return user;
};

export const updateFarming = async (id, price) => {
  const user = await UsersCollection.findOne({ id });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  if (Date.now() > user.farmEnd) {
    throw createHttpError(500, 'Farming end!');
  }

  if (user.tempTokens === 0) {
    const timeNow = Date.now();
    const newTempTokens =
      ((timeNow - user.farmStart) / 1000) * user.currentPrice;

    const updUser = await UsersCollection.findOneAndUpdate(
      { id: id },
      {
        $set: {
          tempTokens: newTempTokens,
          lastUpdTime: timeNow,
          currentPrice: price,
        },
      },
      { new: true },
    );
    return updUser;
  }

  if (user.tempTokens > 0) {
    const timeNow = Date.now();
    const newTempTokens =
      ((timeNow - user.lastUpdTime) / 1000) * user.currentPrice;

    const updUser = await UsersCollection.findOneAndUpdate(
      { id: id },
      {
        $set: {
          tempTokens: user.tempTokens + newTempTokens,
          lastUpdTime: timeNow,
          currentPrice: price,
        },
      },
      { new: true },
    );
    return updUser;
  }
};

export const claimTokens = async (id) => {
  const user = await UsersCollection.findOne({ id });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  if (Date.now() > user.farmEnd) {
    if (user.tempTokens === 0) {
      const tokens = FARMING_TIME * user.currentPrice;

      const updUser = await UsersCollection.findOneAndUpdate(
        { id: id },
        [
          {
            $set: {
              tokens: user.tokens + tokens,
              tempTokens: 0,
              currentPrice: 0,
              farmStart: 0,
              farmEnd: 0,
              lastUpdTime: 0,
            },
          },
        ],
        { new: true },
      );

      return updUser;
    }

    if (user.tempTokens > 0) {
      const updUser = await UsersCollection.findOneAndUpdate(
        { id: id },
        [
          {
            $set: {
              tokens: { $add: ['$tokens', '$tempTokens'] },
              tempTokens: 0,
              currentPrice: 0,
              farmStart: 0,
              farmEnd: 0,
              lastUpdTime: 0,
            },
          },
        ],
        { new: true },
      );

      return updUser;
    }
  }
};
