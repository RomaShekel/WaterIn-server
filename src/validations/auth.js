import Joi from 'joi';
import { emailRegexp } from '../constants/user.js';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
}).messages({
  'string.base': 'Field {#label} must be a string.',
  'string.empty': 'Field {#label} cannot be empty.',
  'string.email': 'Field {#label} must be a valid email address.',
  'any.required': 'missing required {#label} field',
});

export const loginUserSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
}).messages({
  'string.base': 'Field {#label} must be a string.',
  'string.empty': 'Field {#label} cannot be empty.',
  'string.email': 'Field {#label} must be a valid email address.',
  'any.required': 'missing required {#label} field',
});
