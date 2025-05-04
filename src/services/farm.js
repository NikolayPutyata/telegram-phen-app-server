import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';
import {
  TOTAL_TOKENS_FARM_WITH_STARDART_SPEED_PER_8_HOURS,
  TOTAL_TOKENS_FARM_WITH_STARDART_SPEED_PER_12_HOURS,
  TOTAL_TOKENS_FARM_WITH_STARDART_SPEED_PER_24_HOURS,
} from '../constants/index.js';
import { SkinsCollection } from '../db/models/skin.js';

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

export const claimSkinsBonusService = async (id, colId, indexArray) => {
  const validCollections = {
    1: 'commonCollection',
    2: 'bronzeCollection',
    3: 'silverCollection',
    4: 'goldCollection',
    5: 'platinumCollection',
    6: 'diamondCollection',
  };

  // Находим пользователя и проверяем коллекцию
  const user = await UsersCollection.findOne({
    id,
    'skinsCollections.idUserCollection': colId,
  });

  if (!user) {
    throw new Error('User or collection not found');
  }

  // Находим нужную коллекцию пользователя
  const collection = user.skinsCollections.find(
    (c) => c.idUserCollection === colId,
  );

  if (!collection) {
    throw new Error('Collection not found');
  }

  // Проверяем, что все указанные скины собраны (true)
  for (const index of indexArray) {
    if (
      index < 0 ||
      index >= collection.images.length ||
      !collection.images[index]
    ) {
      throw new Error(`Invalid or uncollected skin at index ${index}`);
    }
  }

  // Находим бонусы для указанных скинов из SkinsCollection
  const skinsData = await SkinsCollection.findOne({});
  if (!skinsData) {
    throw new Error('Skins collection not found');
  }

  // Получаем массив скинов для указанной подколлекции
  const skins = skinsData[validCollections[colId]] || [];
  if (skins.length === 0) {
    throw new Error(`No skins found in ${colId}`);
  }

  // Подсчитываем общий бонус
  let totalBonus = 0;
  for (const index of indexArray) {
    if (index >= skins.length) {
      throw new Error(`Skin at index ${index} does not exist in ${colId}`);
    }
    totalBonus += skins[index].skin_bonus || 0;
  }

  // Формируем обновления для скинов (устанавливаем images[index] в false)
  const updateFields = {};
  indexArray.forEach((index) => {
    updateFields[`skinsCollections.$.images.${index}`] = false;
  });

  // Обновляем пользователя: устанавливаем images в false и добавляем токены
  const updatedUser = await UsersCollection.findOneAndUpdate(
    { id, 'skinsCollections.idUserCollection': colId },
    {
      $set: updateFields,
      $inc: { tokens: totalBonus },
    },
    { new: true },
  );

  if (!updatedUser) {
    throw new Error('Failed to update user');
  }

  return updatedUser;
};
