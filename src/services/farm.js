import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';
import {
  FARMING_TIME,
  ONE_DAY,
  TOTAL_TOKENS_FARM_WITH_STARDART_SPEED_PER_8_HOURS,
} from '../constants/index.js';

export const startFarming = async (id, boostsIdsArray) => {
  const farmStart = Date.now();
  const farmEnd = farmStart + FARMING_TIME;

  const user = await UsersCollection.findOne({ id });

  if (!user) {
    throw new Error('User Not Found!');
  }

  if (boostsIdsArray.length === 0) {
    const userUpd = await UsersCollection.findOneAndUpdate(
      { id },
      {
        $set: {
          farmStart,
          farmEnd,
          isFarming: true,
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

    const remainingBoosts = user.boosts.filter(
      (boost) => !boostsIdsArray.includes(boost.idItem),
    );
    const currentActiveBoosts = user.boosts.filter((boost) =>
      boostsIdsArray.includes(boost.idItem),
    );

    const userUpd = await UsersCollection.findOneAndUpdate(
      { id },
      {
        $set: {
          farmStart,
          farmEnd,
          currentBoost: boostBonusSum,
          isFarming: true,
          boosts: remainingBoosts,
          activeBoosts: currentActiveBoosts,
        },
      },
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
    const tokens =
      user.currentBoost === 0
        ? TOTAL_TOKENS_FARM_WITH_STARDART_SPEED_PER_8_HOURS
        : user.currentBoost * TOTAL_TOKENS_FARM_WITH_STARDART_SPEED_PER_8_HOURS;

    const updUser = await UsersCollection.findOneAndUpdate(
      { id: id },
      [
        {
          $set: {
            tokens: Number((user.tokens + tokens).toFixed(1)),
            currentBoost: 0,
            farmStart: 0,
            farmEnd: 0,
            isFarming: false,
            activeBoosts: [],
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
