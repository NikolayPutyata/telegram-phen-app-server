import { completedTaskService } from '../services/tasks.js';

export const tasksCompletedController = async (req, res) => {
  const userId = req.body.id;
  const taskId = req.body.taskId;

  const user = await completedTaskService(userId, taskId);

  res.status(200).json({ userTasks: user.usersTasks });
};
