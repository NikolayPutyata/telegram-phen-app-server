import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { botController } from '../controllers/webhook.js';

const router = Router();

router.post('/bot', ctrlWrapper(botController));

export default router;
