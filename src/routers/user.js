import { Router } from 'express';

import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getInitUserController,
  getUsersFriendsController,
} from '../controllers/user.js';
import { initUserSchema, getFriendsSchema } from '../validation/users.js';

const router = Router();

router.post(
  '/initUser',
  validateBody(initUserSchema),
  ctrlWrapper(getInitUserController),
);
router.post(
  '/getFriends',
  validateBody(getFriendsSchema),
  ctrlWrapper(getUsersFriendsController),
);

export default router;
