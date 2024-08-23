import { Router } from "express";
import { 
    createBoardController, 
    deleteBoardController, 
    getBoardController, 
    patchBoardController,
    getUsersBoardsController
} from "../controllers/boards.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = Router();

router.get('/boardId', ctrlWrapper(getBoardController))
router.get('/', ctrlWrapper(getUsersBoardsController))
router.post('/', ctrlWrapper(createBoardController));
router.delete('/:boardId', ctrlWrapper(deleteBoardController));
router.patch('/:boardId', ctrlWrapper(patchBoardController))

export default router