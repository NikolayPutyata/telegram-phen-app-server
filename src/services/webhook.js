import { UsersCollection } from '../db/models/user.js';

export const addFriendToUserService = async (
  userId,
  friendId,
  firstName,
  photo,
) => {
  if (userId === Number(friendId)) {
    return;
  }
  const friend = await UsersCollection.findOne({ id: Number(friendId) });

  if (friend) {
    return;
  }

  if (!friend) {
    await UsersCollection.findOneAndUpdate(
      { id: userId },
      [
        {
          $set: {
            friends: {
              $cond: {
                if: {
                  $in: [{ id: Number(friendId), name: firstName }, '$friends'],
                },
                then: '$friends',
                else: {
                  $concatArrays: [
                    '$friends',
                    [{ id: Number(friendId), name: firstName }],
                  ],
                },
              },
            },
            tokens: {
              $cond: {
                if: {
                  $in: [{ id: Number(friendId), name: firstName }, '$friends'],
                },
                then: '$tokens',
                else: { $add: ['$tokens', 500] },
              },
            },
          },
        },
      ],
      { new: true },
    );
  }
};
