import { userCollection } from '../db/models/user.js';

export const getUserInit = async (id) => {
  const user = await userCollection.findOne(id);
  return user;
};
