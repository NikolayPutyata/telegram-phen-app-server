import axios from 'axios';
import { UsersCollection } from '../db/models/user.js';
import createHttpError from 'http-errors';
import { env } from '../utils/env.js';

export const completedTaskService = async (userId, taskId) => {
  const updatedUser = await UsersCollection.findOneAndUpdate(
    {
      id: userId,
      $or: [
        { 'usersTasks.gaming.id': taskId },
        { 'usersTasks.partners.id': taskId },
        { 'usersTasks.special.id': taskId },
      ],
    },
    [
      {
        $set: {
          'usersTasks.gaming': {
            $map: {
              input: '$usersTasks.gaming',
              as: 'task',
              in: {
                $mergeObjects: [
                  '$$task',
                  {
                    completed: {
                      $cond: {
                        if: { $eq: ['$$task.id', taskId] },
                        then: true,
                        else: '$$task.completed',
                      },
                    },
                  },
                ],
              },
            },
          },
          'usersTasks.partners': {
            $map: {
              input: '$usersTasks.partners',
              as: 'task',
              in: {
                $mergeObjects: [
                  '$$task',
                  {
                    completed: {
                      $cond: {
                        if: { $eq: ['$$task.id', taskId] },
                        then: true,
                        else: '$$task.completed',
                      },
                    },
                  },
                ],
              },
            },
          },
          'usersTasks.special': {
            $map: {
              input: '$usersTasks.special',
              as: 'task',
              in: {
                $mergeObjects: [
                  '$$task',
                  {
                    completed: {
                      $cond: {
                        if: { $eq: ['$$task.id', taskId] },
                        then: true,
                        else: '$$task.completed',
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      },
      {
        $set: {
          tokens: {
            $add: [
              '$tokens',
              {
                $sum: {
                  $map: {
                    input: {
                      $concatArrays: [
                        '$usersTasks.gaming',
                        '$usersTasks.partners',
                        '$usersTasks.special',
                      ],
                    },
                    as: 'task',
                    in: {
                      $cond: {
                        if: { $eq: ['$$task.id', taskId] },
                        then: '$$task.task_bonus',
                        else: 0,
                      },
                    },
                  },
                },
              },
            ],
          },
        },
      },
    ],
    { new: true },
  );

  if (!updatedUser) {
    throw createHttpError(404, 'Task not found or already completed');
  }

  return updatedUser;
};

export const getChatMemberService = async (userId, channelId) => {
  const { data } = await axios.get(
    `https://api.telegram.org/bot${env(
      'TELEGRAM_BOT_TOKEN',
    )}/getChatMember?chat_id=${channelId}&user_id=${userId}`,
  );

  return data;
};
