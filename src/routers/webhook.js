import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { botController } from '../controllers/webhook.js';
import { botWebhookSchema } from '../validation/webhook.js';

const router = Router();

router.post('/bot', validateBody(botWebhookSchema), ctrlWrapper(botController));

export default router;
