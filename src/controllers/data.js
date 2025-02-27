import { getAllBoostsService } from '../services/data.js';

export const getAllBoostsController = async (req, res) => {
  const boosts = await getAllBoostsService();

  res.status(200).json({ data: boosts });
};
