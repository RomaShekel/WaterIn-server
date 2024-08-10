import jwt from 'jsonwebtoken';
import { UsersCollection } from '../db/model/users.js';
import 'dotenv/config';
import createHttpError from 'http-errors';

const { JWT_SECRET, FRONTEND_URL, REFRESH_SECRET_KEY } = process.env;

export const verifyEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;

    const user = await UsersCollection.findOne({ verificationToken });

    if (!user) {
      throw createHttpError(404, 'User not found');
    }

    user.isVerified = true;
    await user.save();

    if (user.isVerified) {
      return res.redirect(`${FRONTEND_URL}/tracker`);
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
      expiresIn: '30d',
    });

    await UsersCollection.findByIdAndUpdate(user._id, { token, refreshToken });

    return res.redirect(
      `${FRONTEND_URL}/verify-email?accessToken=${token}&refreshToken=${refreshToken}`,
    );
  } catch (error) {
    next(error);
  }
};
