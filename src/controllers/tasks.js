import {
  completedTaskService,
  getChatMemberService,
} from '../services/tasks.js';

export const tasksCompletedController = async (req, res) => {
  const userId = req.body.id;
  const taskId = req.body.taskId;

  const user = await completedTaskService(userId, taskId);

  res.status(200).json({ userTasks: user.usersTasks });
};

export const getChatMemberController = async (req, res) => {
  const { userId, channelId } = req.body;

  const chatMember = await getChatMemberService(userId, channelId);

  res.status(200).json({ status: chatMember.result.status });
};
