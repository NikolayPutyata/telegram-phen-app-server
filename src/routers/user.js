import { Router } from 'express';

import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getInitUserController,
  getUsersFriendsController,
} from '../controllers/user.js';

const router = Router();

router.post('/initUser', ctrlWrapper(getInitUserController));
router.post('/getFriends', ctrlWrapper(getUsersFriendsController));

export default router;
