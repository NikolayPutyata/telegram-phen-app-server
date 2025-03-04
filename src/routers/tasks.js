import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import {
  getChatMemberController,
  tasksCompletedController,
} from '../controllers/tasks.js';
import { tasksCompletedSchema } from '../validation/tasks.js';

const router = Router();

router.post(
  '/completed',
  validateBody(tasksCompletedSchema),
  tasksCompletedController,
);

router.post('/getChatMember', getChatMemberController);

export default router;
