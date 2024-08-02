import createHttpError from 'http-errors';
import { getUserProfile, updateUserProfile } from '../services/users.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import saveFileToPublicDir from '../utils/saveFileToPublicDir.js';
import { env } from '../utils/env.js';

// get User info

export const getUserProfileController = async (req, res, next) => {
  const { userId } = req.params;
  const UserProfile = await getUserProfile({ _id: userId });

  if (!UserProfile) {
    return next(createHttpError(404, 'User not found'));
  }

  res.status(200).json({
    status: 200,
    message: 'User profile info retrieved succesfully',
    data: UserProfile,
  });
};

// update User info

export const updateUserProfileController = async (req, res, next) => {
  const { userId } = req.params;
  const updatedData = req.body;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToPublicDir(photo);
    }
  }

  const user = await updateUserProfile(
    { _id: userId },
    {
      ...updatedData,
      photo: photoUrl,
    },
  );
  if (!user) {
    return next(createHttpError(404, 'User not found'));
  }

  res.status(200).json({
    status: 200,
    message: 'User profile updated succesfully',
    data: user,
  });
};
