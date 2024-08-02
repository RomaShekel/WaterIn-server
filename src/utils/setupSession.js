import { ONE_DAY } from '../constants/index.js';

export const setupSession = (res, session) => {
  const userAgent = res.req.headers['user-agent'];

  const isSafari =
    userAgent.includes('Safari') &&
    !userAgent.includes('Chrome') &&
    !userAgent.includes('Chromium');

  const cookieOptions = {
    httpOnly: true,
    sameSite: isSafari ? 'Lax' : 'None',
    secure: process.env.NODE_ENV === 'production', // true тільки у продакшн
    expires: new Date(Date.now() + ONE_DAY),
  };

  res.cookie('refreshToken', session.refreshToken, cookieOptions);
  res.cookie('sessionId', session._id, cookieOptions);
};
