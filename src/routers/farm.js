import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  claimTokensController,
  farmStartController,
  farmUpdateController,
} from '../controllers/farm.js';

const router = Router();

router.post('/farmStart', ctrlWrapper(farmStartController));
router.post('/farmUpdate', ctrlWrapper(farmUpdateController));
router.post('/claimTokens', ctrlWrapper(claimTokensController));

export default router;
