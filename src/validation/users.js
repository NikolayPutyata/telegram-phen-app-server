import Joi from 'joi';
import { createBoostSchema } from './boosts.js';
import { createSkinSchema } from './skins.js';
import { taskSchema } from './tasks.js';

export const initUserSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    'number.base': 'id must be a number',
    'number.integer': 'id must be an integer',
    'any.required': 'id is required',
  }),
  first_name: Joi.string().max(50).allow('').optional().messages({
    'string.base': 'first_name must be a string',
    'string.max': 'first_name must not exceed 50 characters',
  }),
  last_name: Joi.string().max(50).allow('').optional().messages({
    'string.base': 'last_name must be a string',
    'string.max': 'last_name must not exceed 50 characters',
  }),
  language_code: Joi.string().max(10).required().messages({
    'string.base': 'language_code must be a string',
    'string.max': 'language_code must not exceed 10 characters',
    'any.required': 'language_code is required',
  }),
  photo_url: Joi.string().uri().required().messages({
    'string.base': 'photo_url must be a string',
    'string.uri': 'photo_url must be a valid URL',
    'any.required': 'photo_url is required',
  }),
  username: Joi.string().max(50).allow('').optional().messages({
    'string.base': 'username must be a string',
    'string.max': 'username must not exceed 50 characters',
  }),
  friends: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().integer().required().messages({
          'number.base': 'friend id must be a number',
          'number.integer': 'friend id must be an integer',
          'any.required': 'friend id is required',
        }),
        name: Joi.string().max(50).allow('').optional().messages({
          'string.base': 'friend name must be a string',
          'string.max': 'friend name must not exceed 50 characters',
        }),
      }),
    )
    .optional()
    .messages({
      'array.base': 'friends must be an array',
    }),
  tokens: Joi.number().optional().messages({
    'number.base': 'tokens must be a number',
  }),
  isFarming: Joi.boolean().optional().messages({
    'boolean.base': 'isFarming must be a boolean',
  }),
  farmStart: Joi.number().optional().messages({
    'number.base': 'farmStart must be a number',
  }),
  farmEnd: Joi.number().optional().messages({
    'number.base': 'farmEnd must be a number',
  }),
  currentBoost: Joi.number().optional().messages({
    'number.base': 'currentBoost must be a number',
  }),
  skins: Joi.array().items(createSkinSchema).optional().messages({
    'array.base': 'skins must be an array',
  }),
  boosts: Joi.array().items(createBoostSchema).optional().messages({
    'array.base': 'boosts must be an array',
  }),
  activeSkins: Joi.array().items(createSkinSchema).optional().messages({
    'array.base': 'activeSkins must be an array',
  }),
  activeBoosts: Joi.array().items(createBoostSchema).optional().messages({
    'array.base': 'activeBoosts must be an array',
  }),
  nextSkinsBonusUpdate: Joi.number().optional().messages({
    'number.base': 'nextSkinsBonusUpdate must be a number',
  }),
  usersTasks: Joi.object({
    gaming: Joi.array().items(taskSchema).optional().messages({
      'array.base': 'gaming tasks must be an array',
    }),
    partners: Joi.array().items(taskSchema).optional().messages({
      'array.base': 'partners tasks must be an array',
    }),
    special: Joi.array().items(taskSchema).optional().messages({
      'array.base': 'special tasks must be an array',
    }),
  }).optional(),
});

export const getFriendsSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    'number.base': 'id must be a number',
    'number.integer': 'id must be an integer',
    'any.required': 'id is required',
  }),
});
