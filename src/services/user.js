import { TasksCollection } from '../db/models/tasks.js';
import { UsersCollection } from '../db/models/user.js';

export const getUserInit = async (user) => {
  const userFromDB = await UsersCollection.findOne({ id: user.id });
  const tasksData = await TasksCollection.findOne();

  const { gaming, partners, special } = tasksData.toObject().tasks;

  const completedTaskIds = new Set(
    userFromDB?.completedTasks.map((task) => task.id) || [],
  );

  const updatedTasks = {
    gaming: gaming.map((task) => ({
      ...task,
      completed: completedTaskIds.has(task.id),
    })),
    partners: partners.map((task) => ({
      ...task,
      completed: completedTaskIds.has(task.id),
    })),
    special: special.map((task) => ({
      ...task,
      completed: completedTaskIds.has(task.id),
    })),
  };

  if (!userFromDB) {
    const newUser = await UsersCollection.create({
      ...user,
      friends: [],
      tokens: 0,
      isFarming: false,
      farmStart: 0,
      farmEnd: 0,
      currentBoost: 0,
      skins: [],
      boosts: [],
      activeSkins: [],
      nextSkinsBonusUpdate: 0,
      completedTasks: [],
      usersTasks: { ...tasksData.toObject().tasks },
    });
    return newUser;
  }

  return { ...userFromDB.toObject(), usersTasks: updatedTasks };
};
