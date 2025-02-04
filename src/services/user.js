import { UsersCollection } from '../db/models/user.js';

export const getUserInit = async (user) => {
  const userFromDB = await UsersCollection.findOne({ id: user.id });

  if (!userFromDB) {
    const newUser = await UsersCollection.create(user);
    return newUser;
  }

  return userFromDB;
};
