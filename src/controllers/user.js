import { getBoostsAndSkinsService, getUserInit } from '../services/user.js';
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
      skins: userInit.skins,
      boosts: userInit.boosts,
      activeSkins: userInit.activeSkins,
      currentBoost: userInit.currentBoost,
      usersTasks: userInit.usersTasks,
      activeBoosts: userInit.activeBoosts,
      farmingCycle: userInit.farmingCycle,
    },
  });
};

export const getBoostsAndSkinsController = async (req, res) => {
  const userId = req.body.userId;

  const user = await getBoostsAndSkinsService(userId);

  res.status(200).json({ skins: user.skins, boosts: user.boosts });
};
