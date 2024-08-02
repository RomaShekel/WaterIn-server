// src/middlewares/isValidId.js

import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(createHttpError(404, 'Not found'));
  }
  next();
};

// додав валідацію нашого айді оскільки в параметрах витягуємо саме його waterId
export const isValidWaterId = (req, res, next) => {
  const { waterId } = req.params;

  if (!isValidObjectId(waterId)) {
    return next(createHttpError(400, 'Invalid ID format'));
  }

  next();
};
