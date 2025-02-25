import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { tasksCompletedController } from '../controllers/tasks.js';

const router = Router();

router.post('/completed', tasksCompletedController);

export default router;
