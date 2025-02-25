import Joi from 'joi';

export const tasksCompletedSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    'number.base': 'id must be a number',
    'number.integer': 'id must be an integer',
    'any.required': 'id is required',
  }),
  taskId: Joi.number().integer().required().messages({
    'number.base': 'taskId must be a number',
    'number.integer': 'taskId must be an integer',
    'any.required': 'taskId is required',
  }),
});

export const taskSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    'number.base': 'id must be a number',
    'number.integer': 'id must be an integer',
    'any.required': 'id is required',
  }),
  name: Joi.string().max(50).required().messages({
    'string.base': 'name must be a string',
    'string.max': 'name must not exceed 50 characters',
    'any.required': 'name is required',
  }),
  svg_url: Joi.string().uri().required().messages({
    'string.base': 'svg_url must be a string',
    'string.uri': 'svg_url must be a valid URL',
    'any.required': 'svg_url is required',
  }),
  task_bonus: Joi.number().required().messages({
    'number.base': 'task_bonus must be a number',
    'any.required': 'task_bonus is required',
  }),
  completed: Joi.boolean().default(false).messages({
    'boolean.base': 'completed must be a boolean',
  }),
});
