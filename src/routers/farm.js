import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  claimTokensController,
  farmStartController,
  claimSkinsBonusController,
} from '../controllers/farm.js';
import {
  farmStartSchema,
  claimTokensSchema,
  claimSkinsBonusSchema,
} from '../validation/farm.js';

const router = Router();

router.post(
  '/farmStart',
  validateBody(farmStartSchema),
  ctrlWrapper(farmStartController),
);
router.post(
  '/claimTokens',
  validateBody(claimTokensSchema),
  ctrlWrapper(claimTokensController),
);
router.post(
  '/claimSkinsBonus',
  validateBody(claimSkinsBonusSchema),
  ctrlWrapper(claimSkinsBonusController),
);

export default router;
