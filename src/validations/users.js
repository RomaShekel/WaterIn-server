import Joi from 'joi';

export const updateUserSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(20)
    .optional()
    .messages({
      'string.min': 'Name must be at least 3 characters long.',
      'string.max': 'Name must be at most 20 characters long.',
    }),
  email: Joi.string()
    .email()
    .optional()
    .messages({
      'string.email': 'Please provide a valid email address.',
    }),
  gender: Joi.string()
    .valid('woman', 'man')
    .optional()
    .messages({
      'any.only': 'Gender must be either "woman" or "man".',
    }),
  weight: Joi.number()
    .optional()
    .min(35)
    .max(150)
    .messages({
      'number.min': 'Weight must be at least 35 kg.',
      'number.max': 'Weight must be at most 150 kg.',
    }),
  sportHours: Joi.number()
    .optional()
    .min(1)
    .max(10)
    .messages({
      'number.min': 'Sport hours must be at least 1 hour.',
      'number.max': 'Sport hours must be at most 10 hours.',
    }),
  waterRate: Joi.number()
    .optional()
    .min(1000)
    .max(5000)
    .messages({
      'number.min': 'Water rate must be at least 1000 ml.',
      'number.max': 'Water rate must be at most 5000 ml.',
    }),
  photo: Joi.string().optional()

});
