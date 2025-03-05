import { Router } from 'express';

import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getBoostsAndSkinsController,
  getInitUserController,
} from '../controllers/user.js';
import { initUserSchema } from '../validation/users.js';

const router = Router();

router.post(
  '/initUser',
  validateBody(initUserSchema),
  ctrlWrapper(getInitUserController),
);
router.post('/getBoostsAndSkins', ctrlWrapper(getBoostsAndSkinsController));

export default router;
