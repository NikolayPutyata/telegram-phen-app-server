import Joi from 'joi';

export const paymentSuccessSchema = Joi.object({
  userId: Joi.number().integer().required().messages({
    'number.base': 'userId must be a number',
    'number.integer': 'userId must be an integer',
    'any.required': 'userId is required',
  }),
  transactionId: Joi.string().required().messages({
    'string.base': 'transactionId must be a string',
    'any.required': 'transactionId is required',
  }),
});

export const formTransactionSchema = Joi.object({
  userId: Joi.number().integer().required().messages({
    'number.base': 'userId must be a number',
    'number.integer': 'userId must be an integer',
    'any.required': 'userId is required',
  }),
  amount: Joi.number().required().messages({
    'number.base': 'amount must be a number',
    'any.required': 'amount is required',
  }),
});

export const createStarInvoiceSchema = Joi.object({
  userId: Joi.number().integer().required().messages({
    'number.base': 'userId must be a number',
    'number.integer': 'userId must be an integer',
    'any.required': 'userId is required',
  }),
  amount: Joi.number().required().messages({
    'number.base': 'amount must be a number',
    'any.required': 'amount is required',
  }),
});