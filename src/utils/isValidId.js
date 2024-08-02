// src/middlewares/isValidId.js

import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {

  const { userId } = req.params;
  
  if (!isValidObjectId(userId)) {
    next(createHttpError(404, 'Not found'));
  }
  next();
};

export const isValidWaterId = (req, res, next) => {
  const { waterId } = req.params;

  if (!isValidObjectId(waterId)) {
    return next(createHttpError(400, 'Invalid ID format'));
  }

  next();
};
