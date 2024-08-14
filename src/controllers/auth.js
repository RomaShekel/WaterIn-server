import createHttpError from 'http-errors';
import queryString from 'query-string';
import axios from 'axios';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';

import { UsersCollection } from '../db/model/users.js';

import {
  loginUser,
  logoutUser,
  registerUser,
  refreshUserSession,
  verificationUserEmail,
  refreshUser,
} from '../services/auth.js';
import { setupSession } from '../utils/setupSession.js';
import { SessionsCollection } from '../db/model/sessions.js';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/index.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  const session = await loginUser(req.body);

  setupSession(res, session);

  const data = {
    userId: user._id,
    name: user.name,
    email: user.email,
    photo: user.photo,
    sportHours: user.sportHours,
    weight: user.weight,
    waterRate: user.waterRate,
    gender: user.gender,
  };

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: { data, accessToken: session.accessToken },
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  setupSession(res, session);

  const user = {
    userId: session.userId,
  };

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { user, accessToken: session.accessToken },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  } else {
    throw createHttpError(400, 'Cookie sessionId not received');
  }

  res.clearCookie('sessionId', {
    httpOnly: true,
    sameSite: 'None',
    secure: process.env.NODE_ENV === 'production',
  });
  res.clearCookie('refreshToken', {
    httpOnly: true,
    sameSite: 'None',
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(204).send();
};

export const refreshTokenController = async (req, res) => {
  const { refreshToken, sessionId } = req.cookies;

  if (!refreshToken || !sessionId) {
    res.status(409);
  }

  const session = await refreshUserSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.status(208).json({
    status: 208,
    message: 'Token successfully refreshed',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const refreshUserController = async (req, res) => {
  const sessionId = req.cookies.sessionId;
  const refreshToken = req.cookies.refreshToken;

  if (!sessionId || !refreshToken) {
    res.status(207);
  }

  const user = await refreshUser(sessionId, refreshToken);

  if (user === null || !user) {
    res.status(207);
  }

  res.status(209).json({
    status: 209,
    message: 'User in',
    data: user,
  });
};

export const googleAuth = async (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: process.env.GOOGLE_AUTH_CLIENT_ID,
    redirect_uri: `${process.env.BASE_URL}/users/google-redirect`,
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '),
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
  });

  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`,
  );
};

export const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

  const urlObj = new URL(fullUrl);
  const code = urlObj.searchParams.get('code');

  if (!code) {
    throw new Error('Authorization code not found');
  }

  const tokenData = await axios({
    url: 'https://oauth2.googleapis.com/token',
    method: 'post',
    data: {
      client_id: process.env.GOOGLE_AUTH_CLIENT_ID,
      client_secret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
      redirect_uri: `${process.env.BASE_URL}/users/google-redirect`,
      grant_type: 'authorization_code',
      code,
    },
  });

  const accessToken = tokenData.data.access_token;

  if (!accessToken) {
    throw new Error('Failed to retrieve google access token');
  }

  const userData = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const { email, name, picture } = userData.data;

  let user = await UsersCollection.findOne({ email });

  if (!user) {
    user = await UsersCollection.create({
      name,
      email,
      password: nanoid(),
      photo: picture,
      isGoogleUser: true,
    });
  } else {
    if (!user.isGoogleUser) {
      user = await UsersCollection.findByIdAndUpdate(user._id, {
        name,
        photo: picture,
        isGoogleUser: true,
      });
    }
  }

  await SessionsCollection.deleteOne({ userId: user._id });

  const payload = { id: user._id };
  const newAccessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
  const newRefreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {
    expiresIn: '30d',
  });

  const data = JSON.stringify(user);

  await UsersCollection.findByIdAndUpdate(user._id, {
    token: newAccessToken,
    refreshToken: newRefreshToken,
  });

  const session = await SessionsCollection.create({
    userId: user._id,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });

  await setupSession(res, session);

  return res.redirect(
    `${process.env.FRONTEND_URL}/verify-email?accessToken=${newAccessToken}&refreshToken=${newRefreshToken}&data=${data}`,
  );
};

export const verificationUserEmailController = async (req, res) => {
  await verificationUserEmail(req.body.email);
  res.json({
    message: 'The verification email has been successfully sent!',
    status: 200,
    data: {},
  });
};
