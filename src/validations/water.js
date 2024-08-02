import Joi from 'joi';
import { TIME_PATTERN } from '../constants/index.js';

export const waterAddShema = Joi.object({
  drinkTime: Joi.string()
    .pattern(new RegExp(TIME_PATTERN))
    .required()
    .messages({
      'string.pattern.base': 'format time must be like this 07:30 or 12:30',
      'string.empty': 'drinkTime is required',
      'any.required': 'drinkTime is required',
    }),
  volume: Joi.number().required().messages({
    'number.base': 'volume must be a number',
    'string.empty': 'volume is required',
    'any.required': 'volume is required',
  }),
});

export const waterUpdateShema = Joi.object({
  drinkTime: Joi.string().pattern(new RegExp(TIME_PATTERN)).messages({
    'string.pattern.base': 'format time must be like this 07:30 or 12:30',
  }),
  volume: Joi.number().messages({
    'number.base': 'volume must be a number',
  }),
});
