import createHttpError from 'http-errors';
import { BoostsCollection } from '../db/models/boost.js';
import { TasksCollection } from '../db/models/tasks.js';
import { UsersCollection } from '../db/models/user.js';

export const getUserInit = async (user) => {
  const userFromDB = await UsersCollection.findOne({ id: user.id });

  const tasksData = await TasksCollection.findOne();

  if (!userFromDB) {
    const newUser = await UsersCollection.create({
      ...user,
      friends: [],
      tokens: 0,
      isFarming: false,
      farmStart: 0,
      farmEnd: 0,
      currentBoost: 0,
      skins: [],
      boosts: [],
      activeSkins: [],
      nextSkinsBonusUpdate: 0,
      activeBoosts: [],
      farmingCycle: 8,
      tgRefLink: '',
      tgRefLinkCode: '',
      tempTokens: 0,
      usersTasks: { ...tasksData.toObject().tasks },
      skinsCollections: [
        { idUserCollection: 1, images: [true, true, false, false] },
        { idUserCollection: 2, images: [false, false, false, false] },
        { idUserCollection: 3, images: [false, false, false, false] },
        { idUserCollection: 4, images: [false, false, false, false] },
        { idUserCollection: 5, images: [false, false, false, false] },
        { idUserCollection: 6, images: [false, false, false, false] },
      ],
    });
    return newUser;
  }

  return userFromDB;
};

export const getBoostsAndSkinsService = async (userId) => {
  const userFromDB = await UsersCollection.findOne({ id: userId });

  return userFromDB;
};

export const addRefTgLinkService = async (id, link) => {
  const tgRefLinkCode = link.split('_tgr_')[1];

  const userFromDB = await UsersCollection.findOneAndUpdate(
    { id: id },
    {
      $set: {
        tgRefLink: link,
        tgRefLinkCode: tgRefLinkCode,
      },
    },
    { new: true },
  );

  return userFromDB;
};

export const addPrizeService = async (userId, boostId, collectionId) => {
  if (collectionId === 1) {
    const boostIds = {
      99: 1000,
      98: 3000,
      97: 5000,
      96: 10000,
    };

    const tokensToAdd = boostIds[boostId];

    if (tokensToAdd === undefined) {
      throw new Error('Invalid boostId');
    }

    const updatedUser = await UsersCollection.findOneAndUpdate(
      { id: userId },
      { $inc: { tokens: tokensToAdd } },
      { new: true },
    );

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return updatedUser;
  }

  if (collectionId === 2) {
    const boostsArray = await BoostsCollection.findOne();

    const boosts = [...boostsArray.boosts[1].special];

    const boost = boosts.find((boost) => boost.idItem === boostId);

    if (!boost) {
      throw createHttpError(404, 'Boost not found!');
    }

    const boostPlain = boost.toObject ? boost.toObject() : { ...boost };
    const boostWithQuantity = { ...boostPlain, quantity: 1 };

    const user = await UsersCollection.findOneAndUpdate(
      { id: userId },
      [
        {
          $set: {
            boosts: {
              $cond: {
                if: { $in: [boostId, '$boosts.idItem'] },
                then: {
                  $map: {
                    input: '$boosts',
                    as: 'boost',
                    in: {
                      $cond: {
                        if: { $eq: ['$$boost.idItem', boostId] },
                        then: {
                          $mergeObjects: [
                            '$$boost',
                            {
                              quantity: {
                                $add: [{ $ifNull: ['$$boost.quantity', 0] }, 1],
                              },
                            },
                          ],
                        },
                        else: '$$boost',
                      },
                    },
                  },
                },
                else: {
                  $concatArrays: [
                    { $ifNull: ['$boosts', []] },
                    [boostWithQuantity],
                  ],
                },
              },
            },
          },
        },
      ],
      { new: true },
    );

    return user;
  }
  // if (collectionId === 3) {
  // }
};

export const getCollectionItemService = async (userId, colId, index) => {
  const tokenMap = {
    1: 100,
    2: 2000,
    3: 3000,
    4: 4500,
    5: 8000,
    6: 12000,
  };

  const user = await UsersCollection.findOne({
    id: userId,
    'skinsCollections.idUserCollection': colId,
  });

  if (!user) {
    throw new Error('User or collection not found');
  }

  const collection = user.skinsCollections.find(
    (c) => c.idUserCollection === colId,
  );

  if (!collection) {
    throw new Error('Collection not found');
  }

  if (collection.images[index] === true) {
    const tokensToAdd = tokenMap[colId] || 0;
    const updatedUser = await UsersCollection.findOneAndUpdate(
      { id: userId },
      { $inc: { tokens: tokensToAdd } },
      { new: true },
    );
    return updatedUser;
  }

  const updatedUser = await UsersCollection.findOneAndUpdate(
    { id: userId, 'skinsCollections.idUserCollection': colId },
    { $set: { [`skinsCollections.$.images.${index}`]: true } },
    { new: true },
  );

  return updatedUser;
};
