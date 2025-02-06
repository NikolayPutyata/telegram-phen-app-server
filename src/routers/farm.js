import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  claimTokensController,
  farmStartController,
  farmUpdateController,
  claimSkinsBonusController,
} from '../controllers/farm.js';

const router = Router();

router.post('/farmStart', ctrlWrapper(farmStartController));
router.post('/farmUpdate', ctrlWrapper(farmUpdateController));
router.post('/claimTokens', ctrlWrapper(claimTokensController));
router.post('/claimSkinsBonus', ctrlWrapper(claimSkinsBonusController));

export default router;
