// src/middlewares/isValidId.js

import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  // const { contactId } = req.params;
  const { userId } = req.params;
  if (!isValidObjectId(userId)) {
    next(createHttpError(404, 'Not found'));
  }
  next();
};
