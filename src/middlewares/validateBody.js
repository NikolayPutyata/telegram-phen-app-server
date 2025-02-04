import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  } catch (err) {
    const errorDetails = err.details?.map((detail) => detail.message) || [];
    const error = createHttpError(400, 'Validation Error', {
      message: 'Please ensure all provided data is in the correct format.',
      errors: errorDetails,
    });
    next(error);
  }
};
