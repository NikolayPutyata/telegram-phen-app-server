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
      tempTokens: 0,
      usersTasks: { ...tasksData.toObject().tasks },
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
  const userFromDB = await UsersCollection.findOneAndUpdate(
    { id: id },
    { $set: { tgRefLink: link } },
    { new: true },
  );
  return userFromDB;
};
