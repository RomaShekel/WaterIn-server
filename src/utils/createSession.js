// src/utils.createSession.js

import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/index.js';
import { randomBytes } from "crypto";

export const createSession = () => {
    const accessToken = randomBytes(30).toString('base64');
    const refreshToken = randomBytes(30).toString('base64');

    return {
        accessToken,
        refreshToken,
        accessTokenValidUntil:new Date(Date.now() + FIFTEEN_MINUTES),
        refreshTokenValidUntil:new Date(Date.now() + ONE_DAY),
    };
};