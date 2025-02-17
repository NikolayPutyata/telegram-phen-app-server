import { model, Schema } from 'mongoose';

const TaskSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  svg_url: { type: String, required: true },
  task_bonus: { type: Number, required: true },
  completed: { type: Boolean, default: false },
});

const TaskCategorySchema = new Schema({
  gaming: [TaskSchema],
  partners: [TaskSchema],
  special: [TaskSchema],
});

export const TasksCollection = model('tasksCategory', TaskCategorySchema);
