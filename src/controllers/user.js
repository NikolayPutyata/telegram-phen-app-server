import { getUserInit } from '../services/user.js';

import createHttpError from 'http-errors';

export const getInitUserController = async (req, res) => {
  const user = req.body;

  const userInit = await getUserInit(user);

  if (!userInit) {
    throw createHttpError(404, 'User not found');
  }

  res.json({
    status: 200,
    message: 'Successfully found user!',
    data: {
      id: userInit.id,
      username: userInit.username,
      first_name: userInit.first_name,
      last_name: userInit.last_name,
      photo_url: userInit.photo_url,
      language_code: userInit.language_code,
      tokens: userInit.tokens,
      friends: userInit.friends,
    },
  });
};
