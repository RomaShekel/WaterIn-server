import createHttpError from 'http-errors';
import { UsersCollection } from '../db/model/users.js';


export const getUserProfile = async (userId) => {
  const user = await UsersCollection.findOne(userId).select('-passowrd');
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  return user;
};

export const updateUserProfile = async (userId, updatedData) => {
  const user = await UsersCollection.findOneAndUpdate(userId, updatedData, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  return user;
};

export const getTotalUsers = async () => {
  const count = await UsersCollection.countDocuments();
  return count;
};
