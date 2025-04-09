import { BoostsCollection } from '../db/models/boost.js';
import { CasesAndRobotsCollection } from '../db/models/casesAndRobots.js';
import { SkinsCollection } from '../db/models/skin.js';

export const getAllData = async () => {
  const boosts = await BoostsCollection.findOne();
  const skins = await SkinsCollection.findOne();
  const casesAndRobots = await CasesAndRobotsCollection.findOne();

  console.log(casesAndRobots);

  return {
    boosts: {
      common: [...boosts.boosts[0].common],
      special: [...boosts.boosts[1].special],
    },
    skins: {
      commonCollection: skins.commonCollection,
      bronzeCollection: skins.bronzeCollection,
      silverCollection: skins.silverCollection,
      goldCollection: skins.goldCollection,
      platinumCollection: skins.platinumCollection,
      diamondCollection: skins.diamondCollection,
    },
    cases: casesAndRobots.cases,
    robots: casesAndRobots.robots,
  };
};
