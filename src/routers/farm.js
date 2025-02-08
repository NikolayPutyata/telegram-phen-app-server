import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  claimTokensController,
  farmStartController,
  claimSkinsBonusController,
} from '../controllers/farm.js';

const router = Router();

router.post('/farmStart', ctrlWrapper(farmStartController));
router.post('/claimTokens', ctrlWrapper(claimTokensController));
router.post('/claimSkinsBonus', ctrlWrapper(claimSkinsBonusController));

export default router;
