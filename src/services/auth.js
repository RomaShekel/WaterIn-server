import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import createHttpError from 'http-errors';

import { UsersCollection } from '../db/model/users.js';
import { SessionsCollection } from '../db/model/sessions.js';
import { FIFTEEN_MINUTES, ONE_DAY, SMTP } from '../constants/index.js';
import { env } from '../utils/env.js';
import { sendEmail } from '../utils/sendMail.js';

export const registerUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const isEqual = await bcrypt.compare(payload.password, user.password);

  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  await SessionsCollection.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await SessionsCollection.create({
    userId: user._id,
    name: user.name,
    email: user.email,
    photo: user.photo,
    sportHours: user.sportHours,
    weight: user.weight,
    waterRate: user.waterRate,
    gender: user.gender,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};

export const logoutUser = async (sessionId) => {
  if (!sessionId) {
    throw createHttpError(401, 'Session not found');
  }

  await SessionsCollection.deleteOne({ _id: sessionId });
};

export const refreshUserSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionsCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(408, 'Session not found12');
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(408, 'Session token expired');
  }

  const newAccessToken = randomBytes(30).toString('base64');
  const newRefreshToken = randomBytes(30).toString('base64');

  await SessionsCollection.updateOne(
    {
      _id: session._id,
    },
    {
      $set: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
        refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
      },
    },
  );

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    _id: sessionId,
  };
};

export const verificationUserEmail = async (email) => {
  const user = await UsersCollection.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  await sendEmail({
    from: env(SMTP.SMTP_FROM),
    to: email,
    subject: 'Email verification',
    html: `<p>Please click <a href="https://water-in.vercel.app/">here</a> to confirm your email!</p>`,
  });
};

export const refreshUser = async (sessionId, refreshToken) => {

  const session = await SessionsCollection.findOne({ _id: sessionId, refreshToken: refreshToken });

  // if (!session) {
  //   return null;
  // }
// console.log(session)
  const isRefreshTokenExpired = new Date() > new Date(session.refreshTokenValidUntil);

  if(isRefreshTokenExpired) {
    return null;
  }

  const user = await UsersCollection.findOne({_id:session.userId}).select('-password')

  if(!user) {
    return null
  }

  return {user, accessToken:session.accessToken};
}

