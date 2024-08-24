import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
    createCardController,
    deleteCardController,
    getBoardCardsController,
     getCardController,
     getColumnCardsController,
     patchCardController
} from "../controllers/card.js";

const router = Router();

router.use(authenticate);

router.get('/:cardId', ctrlWrapper(getCardController));
router.get('/column/:columnId', ctrlWrapper(getColumnCardsController));
router.get('/board/:boardId', ctrlWrapper(getBoardCardsController))
router.post('/', ctrlWrapper(createCardController))
router.delete('/:cardId', ctrlWrapper(deleteCardController))
router.patch('/:cardId', ctrlWrapper(patchCardController))

export default router;