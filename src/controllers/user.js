import { getUserInit } from '../services/user.js';

import createHttpError from 'http-errors';

export const getInitUserController = async (req, res) => {
  const user = req.body.user;

  const userInit = await getUserInit(user);

  if (!userInit) {
    throw createHttpError(404, 'User not found');
  }

  res.json({
    status: 200,
    message: 'Successfully found user!',
    data: userInit,
  });
};
