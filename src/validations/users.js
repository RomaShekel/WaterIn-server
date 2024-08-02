import Joi from 'joi';

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(20).optional(),
  email: Joi.string().email().optional(),
  gender: Joi.string().valid('woman', 'man').optional(),
  weight: Joi.number().optional(),
  sportHours: Joi.number().optional(),
  waterRate: Joi.number().optional(),
  photo: Joi.string().optional(),
});
