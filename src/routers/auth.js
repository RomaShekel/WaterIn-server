// src/routers/auth.js
import { Router } from 'express';
import { validateBody } from '../utils/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { verifyEmail } from '../utils/verifyEmail.js';
import {
  loginUserController,
  logoutUserController,
  registerUserController,
  refreshTokenController,
  googleRedirect,
  googleAuth,
  verificationUserEmailController,
} from '../controllers/auth.js';

import {
  loginUserSchema,
  registerUserSchema,
  verificationEmailShema,
} from '../validations/auth.js';

const router = Router();

router.get('/verify/:verificationToken', verifyEmail);

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

// router.post(
//     '/send-reset-email',
//     validateBody(),
//     ctrlWrapper())

// router.post(
//     '/reset-pwd',
//     validateBody(),
//     ctrlWrapper())

export default router;
