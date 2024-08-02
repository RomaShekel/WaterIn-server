// src/routers/users.js

import { Router } from 'express';
import { isValidId } from '../utils/isValidId.js';
import { validateBody } from '../utils/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getUserProfileController,
  updateUserProfileController,
} from '../controllers/users.js';
import { updateUserSchema } from '../validations/users.js';
import { authenticate } from '../middlewares/authentificate.js';
import upload from '../middlewares/photoUpload.js';

const router = Router();

router.use(authenticate);

router.get(
  '/:userId',
  isValidId,
  ctrlWrapper(getUserProfileController)
);

router.patch(
  '/:userId',
  upload.single('photo'),
  isValidId,
  validateBody(updateUserSchema),
  ctrlWrapper(updateUserProfileController),
);

export default router;
