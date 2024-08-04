import createHttpError from 'http-errors';
import {
  loginUser,
  logoutUser,
  registerUser,
  refreshUserSession,
} from '../services/auth.js';
import { setupSession } from '../utils/setupSession.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  const session = await loginUser(req.body);

  setupSession(res, session);

  const data = {
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
    name: session.name,
    email: session.email,
    photo: session.photo,
    sportHours: session.sportHours,
    weight: session.weight,
    waterRate: session.waterRate,
    gender: session.gender,
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
    throw createHttpError(400);
  }

  const session = await refreshUserSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Token successfully refreshed',
    data: {
      accessToken: session.accessToken,
    },
  });
};
