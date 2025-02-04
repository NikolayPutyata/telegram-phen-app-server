import { InitUserCollection } from '../db/models/initUser.js';

export const getUserInit = async (id) => {
  const user = await InitUserCollection.findOne(id);
  return user;
};
