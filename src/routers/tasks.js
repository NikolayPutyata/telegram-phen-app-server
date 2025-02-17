import { Router } from 'express';
import { tasksCompletedController } from '../controllers/tasks.js';

const router = Router();

router.post('/completed', tasksCompletedController);

export default router;
