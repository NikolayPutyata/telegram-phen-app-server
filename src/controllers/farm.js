import {
  claimSkinsBonusService,
  claimTokens,
  startFarming,
} from '../services/farm.js';

export const farmStartController = async (req, res) => {
  const boostsIdsArray = req.body.boostsIds; // boostsIdsArray - масив id бустів
  const id = req.body.id;

  const user = await startFarming(id, boostsIdsArray);

  res.status(200).json({
    isFarmingStart: user.isFarming,
    farmingEnd: user.farmEnd,
  });
};

export const claimTokensController = async (req, res) => {
  const id = req.body.id;

  const user = await claimTokens(id);

  res
    .status(200)
    .json({ message: 'Download completed successfully!', tokens: user.tokens });
};

export const claimSkinsBonusController = async (req, res) => {
  const id = req.body.id;

  const newTokensAmount = await claimSkinsBonusService(id);

  res.status(200).json({ newTokensAmount });
};
