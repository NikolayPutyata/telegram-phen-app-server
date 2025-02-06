import {
  claimSkinsBonusService,
  claimTokens,
  startFarming,
  updateFarming,
} from '../services/farm.js';

export const farmStartController = async (req, res) => {
  const price = req.body.price;
  const id = req.body.id;

  const user = await startFarming(id, price);

  res.status(200).json({
    isFarmingStart: user.isFarming,
    farmingEnd: user.farmEnd,
    currentPrice: user.currentPrice,
  });
};

export const farmUpdateController = async (req, res) => {
  const price = req.body.price;
  const id = req.body.id;

  const user = await updateFarming(id, price);

  res
    .status(200)
    .json({ farmingEnd: user.farmEnd, currentPrice: user.currentPrice });
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
