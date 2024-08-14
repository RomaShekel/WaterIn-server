// src/routers/auth.js
import { Router } from 'express';
import { validateBody } from '../utils/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {
  loginUserController,
  logoutUserController,
  registerUserController,
  refreshTokenController,
  googleRedirect,
  googleAuth,
  verificationUserEmailController,
  refreshUserController,
} from '../controllers/auth.js';

import {
  loginUserSchema,
  registerUserSchema,
  verificationEmailShema,
} from '../validations/auth.js';

const router = Router();

router.get('/google', googleAuth);

router.get('/google-redirect', googleRedirect);

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/refresh', ctrlWrapper(refreshTokenController));

router.post('/logout', ctrlWrapper(logoutUserController));

router.post(
  '/send-verification-email',
  validateBody(verificationEmailShema),
  ctrlWrapper(verificationUserEmailController),
);

router.post('/refresh-user', ctrlWrapper(refreshUserController));

export default router;
