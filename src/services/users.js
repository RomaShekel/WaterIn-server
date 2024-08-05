import createHttpError from 'http-errors';
import { UsersCollection } from '../db/model/users.js';


export const getUserProfile = async (userId) => {
  const user = await UsersCollection.findOne(userId).select('-password');
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

  const count = await UsersCollection.estimatedDocumentCount();
  const treeLastUsers = await UsersCollection.find().sort({createdAt: -1}).limit(3);

  const photos = treeLastUsers.map(user => { return user.photo});
  
  console.log(photos)
  return {
    count: count,
    photos: photos,
  };
};

