import { Router } from "express";
import { ctrlWrapper}  from '../utils/ctrlWrapper.js'
import { 
    createColumnController,
    deleteColumnController,
    getAllColumnsController,
    getColumnController,
    patchColumnController
} from "../controllers/columns.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router()

router.use(authenticate)

router.get('/:columnId', ctrlWrapper(getColumnController));
router.get('/board/:boardId', ctrlWrapper(getAllColumnsController));
router.post('/:boardId', ctrlWrapper(createColumnController));
router.delete('/:columnId', ctrlWrapper(deleteColumnController));
router.patch('/:columnId', ctrlWrapper(patchColumnController))

export default router;