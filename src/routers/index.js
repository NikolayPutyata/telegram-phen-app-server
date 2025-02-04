import { Router } from 'express';

import initUserRouter from './user.js';

const router = Router();

router.use('/initUser', initUserRouter);

export default router;
