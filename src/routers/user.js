import { Router } from 'express';

import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  addRefTgLinkController,
  getBoostsAndSkinsController,
  getInitUserController,
  sendPrizeController,
} from '../controllers/user.js';
import { initUserSchema } from '../validation/users.js';

const router = Router();

router.post(
  '/initUser',
  validateBody(initUserSchema),
  ctrlWrapper(getInitUserController),
);
router.post('/getBoostsAndSkins', ctrlWrapper(getBoostsAndSkinsController));
router.post('/addRefTgLink', ctrlWrapper(addRefTgLinkController));
router.post('/sendPrize', ctrlWrapper(sendPrizeController));
export default router;
