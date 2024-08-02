// src/routers/water.js
import { Router } from 'express';
import { isValidWaterId } from '../utils/isValidId.js';
import { validateBody } from '../utils/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { waterAddShema, waterUpdateShema } from '../validations/water.js';
import {
  addWaterController,
  deleteWaterController,
  updateWaterController,
} from '../controllers/water.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);

// router.get(
//     '/',
//     ctrlWrapper("get all water controller"));

// router.get(
//     '/:waterId',
//     isValidId,
//     ctrlWrapper("get water by id controller"));

// прибрав upload.single('photo') оскількі ці данні у юзера йдуть в нас їх нема

router.post('/', validateBody(waterAddShema), ctrlWrapper(addWaterController));

router.patch(
  '/:waterId',
  isValidWaterId,
  validateBody(waterUpdateShema),
  ctrlWrapper(updateWaterController),
);

router.delete('/:waterId', isValidWaterId, ctrlWrapper(deleteWaterController));

export default router;
