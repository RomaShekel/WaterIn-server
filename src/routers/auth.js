// src/routers/auth.js
import { Router } from 'express';
// import { isValidId } from "../utils/isValidId.js";
import { validateBody } from '../utils/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserController,
  logoutUserController,
  registerUserController,
} from '../controllers/auth.js';
import { loginUserSchema, registerUserSchema } from '../validations/auth.js';

const router = Router();

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

// router.post(
//     '/refresh',
//     ctrlWrapper());

router.post('/logout', ctrlWrapper(logoutUserController));

// router.post(
//     '/send-reset-email',
//     validateBody(),
//     ctrlWrapper())

// router.post(
//     '/reset-pwd',
//     validateBody(),
//     ctrlWrapper())

export default router;
