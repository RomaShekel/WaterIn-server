import jwt from 'jsonwebtoken';
import { UsersCollection } from '../db/model/users.js';
import 'dotenv/config';
import createHttpError from 'http-errors';

const { SECRET_KEY, FRONTEND_URL, REFRESH_SECRET_KEY } = process.env;

export const verifyEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await UsersCollection.findOne({ verificationToken });

    if (!user) {
      throw createHttpError(404, 'User not found');
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
      expiresIn: '30d',
    });

    if (user.isVerified) {
      return res.redirect(`${FRONTEND_URL}/tracker`);
    }

    user.isVerified = true;
    await user.save();

    await UsersCollection.findByIdAndUpdate(user._id, { token, refreshToken });

    return res.redirect(
      `${FRONTEND_URL}/verify-email?token=${token}&refreshToken=${refreshToken}`,
    );
  } catch (error) {
    next(error);
  }
};
