// src/routers/water.js
import { Router } from 'express';
import { isValidWaterId } from '../utils/isValidId.js';
import { validateBody } from '../utils/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { waterAddShema, waterGetSchema, waterUpdateShema } from '../validations/water.js';
import {
  addWaterController,
  deleteWaterController,
  updateWaterController,
  getWaterPerMonthController,
  getWaterPerDayController
} from '../controllers/water.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);

router.get(
  '/month',
  validateBody(waterGetSchema),
  ctrlWrapper(getWaterPerMonthController)
);

router.get(
  '/day',
  validateBody(waterGetSchema),
  ctrlWrapper(getWaterPerDayController));

router.post('/', validateBody(waterAddShema), ctrlWrapper(addWaterController));

router.patch(
  '/:waterId',
  isValidWaterId,
  validateBody(waterUpdateShema),
  ctrlWrapper(updateWaterController),
);

router.delete('/:waterId', isValidWaterId, ctrlWrapper(deleteWaterController));

export default router;
