import Joi from 'joi';

export const createBoostSchema = Joi.object({
  idItem: Joi.number().integer().required().messages({
    'number.base': 'idItem must be a number',
    'number.integer': 'idItem must be an integer',
    'any.required': 'idItem is required',
  }),

  name: Joi.string().max(50).allow('').optional().messages({
    'string.base': 'name must be a string',
    'string.max': 'name must not exceed 50 characters',
  }),

  boost_photo_url: Joi.string().uri().required().messages({
    'string.base': 'boost_photo_url must be a string',
    'string.uri': 'boost_photo_url must be a valid URL',
    'any.required': 'boost_photo_url is required',
  }),

  boost_bonus: Joi.number().required().messages({
    'number.base': 'boost_bonus must be a number',
    'any.required': 'boost_bonus is required',
  }),

  collectionId: Joi.number().integer().required().messages({
    'number.base': 'collectionId must be a number',
    'number.integer': 'collectionId must be an integer',
    'any.required': 'collectionId is required',
  }),

  desc: Joi.string().max(200).allow('').optional().messages({
    'string.base': 'desc must be a string',
    'string.max': 'desc must not exceed 200 characters',
  }),

  price: Joi.string()
    .pattern(/^\d+(\.\d{1,2})?$/)
    .required()
    .messages({
      'string.base': 'price must be a string',
      'string.pattern.base':
        'price must be a valid number format (e.g., "100" or "100.50")',
      'any.required': 'price is required',
    }),
});
