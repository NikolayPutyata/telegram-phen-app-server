import Joi from 'joi';

export const botWebhookSchema = Joi.object({
  message: Joi.string().required().messages({
    'string.base': 'message must be a string',
    'any.required': 'message is required',
  }),
  // інші поля, які передає бот
});
