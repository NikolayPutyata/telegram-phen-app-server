import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getInitUserController } from '../controllers/user.js';

const router = Router();

router.get('/user', ctrlWrapper(getInitUserController));

export default router;
