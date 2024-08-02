import createHttpError from 'http-errors';
import { UsersCollection } from '../db/model/users.js';

// get User info by ID
export const getUserProfile = async (userId) => {
  //   console.log(userId);
  const user = await UsersCollection.findOne(userId).select('-passowrd');
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  return user;
};

// update User info

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
