import { UsersCollection } from '../db/models/user.js';

export const addFriendToUserService = async (userId, friendId, firstName) => {
  await UsersCollection.findOneAndUpdate(
    { id: userId },
    {
      $push: { friends: { id: Number(friendId), name: firstName } },
    },
    { new: true },
  );
};
