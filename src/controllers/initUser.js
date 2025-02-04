import { getUserInit } from '../services/user.js';

import createHttpError from 'http-errors';

export const getInitUserController = async (req, res) => {
  const { id } = req.params;

  const userInit = await getUserInit(id);

  if (!userInit) {
    throw createHttpError(404, 'User not found');
  }

  res.json({
    status: 200,
    message: 'Successfully found user!',
    data: userInit,
  });
};
