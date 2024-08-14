import createHttpError from 'http-errors';
import { UsersCollection } from '../db/model/users.js';
import { SessionsCollection } from '../db/model/sessions.js';


export const getUserProfile = async (userId) => {
  const user = await UsersCollection.findOne(userId).select('-password');
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const session = await SessionsCollection.find({userId: user._id})

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }
  return {
    user,
    accessToken: session[0].accessToken,
  };
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
  const treeLastUsers = await UsersCollection.aggregate([
    { $sample: { size: 3 } },
    { $unset: "password" }
  ])

  const photos = treeLastUsers.map(user => { return user.photo});
  
  return {
    count: count,
    photos: photos,
  };
};

