import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';
import {
  ONE_DAY,
  TOTAL_TOKENS_FARM_WITH_STARDART_SPEED_PER_8_HOURS,
  TOTAL_TOKENS_FARM_WITH_STARDART_SPEED_PER_12_HOURS,
  TOTAL_TOKENS_FARM_WITH_STARDART_SPEED_PER_24_HOURS,
} from '../constants/index.js';

export const startFarming = async (id, boostsIdsArray) => {
  const user = await UsersCollection.findOne({ id });

  if (!user) {
    throw new Error('User Not Found!');
  }

  const farmStart = Date.now();
  const farmEnd = farmStart + user.farmingCycle * 60 * 60 * 1000;

  const BASE_TOKENS = {
    8: TOTAL_TOKENS_FARM_WITH_STARDART_SPEED_PER_8_HOURS,
    12: TOTAL_TOKENS_FARM_WITH_STARDART_SPEED_PER_12_HOURS,
    24: TOTAL_TOKENS_FARM_WITH_STARDART_SPEED_PER_24_HOURS,
  };

  const baseTokens = BASE_TOKENS[user.farmingCycle];

  if (boostsIdsArray.length === 0) {
    const userUpd = await UsersCollection.findOneAndUpdate(
      { id },
      {
        $set: {
          farmStart,
          farmEnd,
          isFarming: true,
          tempTokens: baseTokens,
        },
      },
      { new: true },
    );

    return userUpd;
  }

  const matchedBoosts = user.boosts.filter((boost) =>
    boostsIdsArray.includes(boost.idItem),
  );

  if (matchedBoosts.length !== boostsIdsArray.length) {
    throw new Error("User doesn't have all required boosts!");
  }

  if (matchedBoosts.length === boostsIdsArray.length) {
    const boostBonusSum = matchedBoosts.reduce(
      (sum, boost) => sum + boost.boost_bonus,
      0,
    );

    const currentActiveBoosts = user.boosts.filter((boost) =>
      boostsIdsArray.includes(boost.idItem),
    );

    const userUpd = await UsersCollection.findOneAndUpdate(
      { id },
      [
        {
          $set: {
            boosts: {
              $map: {
                input: '$boosts',
                in: {
                  $cond: {
                    if: { $in: ['$$this.idItem', boostsIdsArray] },
                    then: {
                      $cond: {
                        if: { $gt: ['$$this.quantity', 1] },
                        then: {
                          $mergeObjects: [
                            '$$this',
                            { quantity: { $subtract: ['$$this.quantity', 1] } },
                          ],
                        },
                        else: null,
                      },
                    },
                    else: '$$this',
                  },
                },
              },
            },
            farmStart: farmStart,
            farmEnd: farmEnd,
            currentBoost: boostBonusSum,
            isFarming: true,
            activeBoosts: currentActiveBoosts,
            tempTokens: baseTokens * boostBonusSum,
          },
        },
        {
          $set: {
            boosts: {
              $filter: { input: '$boosts', cond: { $ne: ['$$this', null] } },
            },
          },
        },
      ],
      { new: true },
    );

    return userUpd;
  }
};

export const claimTokens = async (id) => {
  const user = await UsersCollection.findOne({ id });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const dateNow = Date.now();

  if (dateNow < user.farmEnd) {
    throw createHttpError(500, 'Farm not end now!');
  }

  if (dateNow > user.farmEnd) {
    const updUser = await UsersCollection.findOneAndUpdate(
      { id: id },
      [
        {
          $set: {
            tokens: Number((user.tokens + user.tempTokens).toFixed(1)),
            currentBoost: 0,
            farmStart: 0,
            farmEnd: 0,
            isFarming: false,
            activeBoosts: [],
            tempTokens: 0,
          },
        },
      ],
      { new: true },
    );

    return updUser;
  }
};

export const claimSkinsBonusService = async (id) => {
  const user = await UsersCollection.findOne({ id });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const date = Date.now();

  if (date < user.nextSkinsBonusUpdate) {
    throw createHttpError(500, 'Bonus is not available yet!');
  }
  if (date > user.nextSkinsBonusUpdate) {
    const nextSkinsBonusUpd = date + ONE_DAY;
    const user = await UsersCollection.findOneAndUpdate(
      { id },
      [
        {
          $set: {
            tokens: {
              $add: [
                '$tokens',
                {
                  $reduce: {
                    input: '$activeSkins',
                    initialValue: 0,
                    in: { $add: ['$$value', '$$this.skin_bonus'] },
                  },
                },
              ],
            },
            nextSkinsBonusUpdate: nextSkinsBonusUpd,
          },
        },
      ],
      { new: true },
    );
    return { newTokensAmount: user.tokens, nextSkinsBonusUpd };
  }
};
