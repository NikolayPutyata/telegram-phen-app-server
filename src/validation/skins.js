import Joi from 'joi';

export const createSkinSchema = Joi.object({
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
  skin_photo_url: Joi.string().uri().required().messages({
    'string.base': 'skin_photo_url must be a string',
    'string.uri': 'skin_photo_url must be a valid URL',
    'any.required': 'skin_photo_url is required',
  }),
  skin_bonus: Joi.number().required().messages({
    'number.base': 'skin_bonus must be a number',
    'any.required': 'skin_bonus is required',
  }),
});
