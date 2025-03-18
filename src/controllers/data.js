import { getAllData } from '../services/data.js';

export const getAllBoostsController = async (req, res) => {
  const data = await getAllData();

  res.status(200).json({ boosts: data.boosts, skins: data.skins });
};
