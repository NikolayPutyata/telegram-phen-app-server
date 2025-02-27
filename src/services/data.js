import { BoostsCollection } from '../db/models/boost.js';

export const getAllBoostsService = async () => {
  const boosts = await BoostsCollection.findOne();

  return {
    common: [...boosts.boosts[0].common],
    special: [...boosts.boosts[1].special],
  };
};
