import createHttpError from 'http-errors';
import queryString from 'query-string';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { UsersCollection } from '../db/model/users.js';

import {
  loginUser,
  logoutUser,
  registerUser,
  refreshUserSession,
  verificationUserEmail,
  refreshUser
} from '../services/auth.js';
import { setupSession } from '../utils/setupSession.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  const session = await loginUser(req.body);

  setupSession(res, session);

  const data = {
    userId: user._id,
    name: user.name,
    email: user.email,
    photo: user.photo,
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
    secure: process.env.NODE_ENV === 'production', // true тільки в продакшн
  });
  res.clearCookie('refreshToken', {
    httpOnly: true,
    sameSite: 'None',
    secure: process.env.NODE_ENV === 'production', //true тільки в продакшн
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

  if(!sessionId || !refreshToken) {
    res.status(207);
  }

  const user = await refreshUser(sessionId, refreshToken);
console.log(user)

  if(user === null || !user) {
    res.status(207)
  }

  res.status(209).json({
    status: 209,
    message: 'User in',
    data: user
  })
}

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
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;

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

  let userData = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  const { email, name } = userData.data;

  let user = await UsersCollection.findOne({ email });

  if (!user) {
    user = await UsersCollection.create({
      email,
      name,
      password: '',
    });
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {
    expiresIn: '30d',
  });

  await UsersCollection.findByIdAndUpdate(user._id, { token, refreshToken });

  return res.redirect(
    `${process.env.FRONTEND_URL}/verify-email?token=${token}&refreshToken=${refreshToken}`,
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
