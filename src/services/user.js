import { UsersCollection } from '../db/models/user.js';

export const getUserInit = async (id) => {
  const user = await UsersCollection.findOne({ id });
  return user;
};
