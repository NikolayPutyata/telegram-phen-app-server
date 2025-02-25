import Joi from 'joi';

export const farmStartSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    'number.base': 'id must be a number',
    'number.integer': 'id must be an integer',
    'any.required': 'id is required',
  }),
  boostsIdsArray: Joi.array()
    .items(
      Joi.number().integer().messages({
        'number.base': 'each boost ID must be a number',
        'number.integer': 'each boost ID must be an integer',
      }),
    )
    .required()
    .messages({
      'array.base': 'boostsIdsArray must be an array',
      'any.required': 'boostsIdsArray is required',
    }),
});

export const claimTokensSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    'number.base': 'id must be a number',
    'number.integer': 'id must be an integer',
    'any.required': 'id is required',
  }),
});

export const claimSkinsBonusSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    'number.base': 'id must be a number',
    'number.integer': 'id must be an integer',
    'any.required': 'id is required',
  }),
});
