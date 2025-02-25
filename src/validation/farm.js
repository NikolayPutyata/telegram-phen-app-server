import Joi from 'joi';

export const farmStartSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    'number.base': 'id must be a number',
    'number.integer': 'id must be an integer',
    'any.required': 'id is required',
  }),
  boostsIds: Joi.array()
    .items(
      Joi.number().integer().messages({
        'number.base': 'each boost ID must be a number',
        'number.integer': 'each boost ID must be an integer',
      }),
    )
    .required()
    .messages({
      'array.base': 'boostsIds must be an array',
      'any.required': 'boostsIds is required',
    }),
});

export const claimSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    'number.base': 'id must be a number',
    'number.integer': 'id must be an integer',
    'any.required': 'id is required',
  }),
});
