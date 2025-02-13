import { model, Schema } from 'mongoose';

const TaskSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  svgUrl: { type: String, required: true },
  taskBonus: { type: Number, required: true },
  completed: { type: Boolean, default: false },
});

const TaskCategorySchema = new Schema({
  gaming: [TaskSchema],
  partners: [TaskSchema],
  special: [TaskSchema],
});

export const TasksCollection = model('tasksCategory', TaskCategorySchema);
