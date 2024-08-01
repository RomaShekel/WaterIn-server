// src/utils/setupSession.js
import { FIFTEEN_MINUTES, ONE_DAY } from "../constants/index.js";

export const setupSession = (res, session) => {
    res.cookie('refreshToken', session.refreshToken, {
        httpOnly:true,
        expire: new Date(Date.now() + FIFTEEN_MINUTES),
    }),
    res.cookie('sessionId', session._id.toString(), {
        httpOnly:true,
        expire: new Date(Date.now() + ONE_DAY),
    });
};