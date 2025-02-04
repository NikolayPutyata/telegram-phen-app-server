import { UserCollection } from '../db/models/user.js';

export const getUserInit = async (id) => {
  const user = await UserCollection.findOne({ id });
  return user;
};
